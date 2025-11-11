import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, summary, tags, content, images } = await request.json();

    // 슬러그 생성 (제목을 URL 친화적으로)
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // 현재 연도
    const year = new Date().getFullYear();

    // MDX 파일 내용 생성
    const mdxContent = `---
title: '${title.replace(/'/g, "'")}'
date: '${new Date().toISOString().split("T")[0]}'
author: '${session.user?.name || "Anonymous"}'
tags: ${JSON.stringify(tags || [])}
summary: '${(summary || "").replace(/'/g, "'")}'
---

${content}
`;

    // GitHub API를 통해 파일 생성
    const owner = "IBAS-DEV-PROJECT";
    const repo = "IBAS-DEV-PROJECT.github.io";
    const path = `posts/${year}/${slug}.mdx`;

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `feat: ${title} 게시글 작성`,
          content: Buffer.from(mdxContent).toString("base64"),
          branch: "main",
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.message || "Failed to create post" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(
      {
        success: true,
        slug: `${year}/${slug}`,
        message: "Post created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

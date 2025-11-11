"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function WriteForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    tags: [] as string[],
    content: "",
  });

  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!formData.title.trim()) {
        setError("제목을 입력해주세요");
        return;
      }

      if (!formData.content.trim()) {
        setError("본문을 입력해주세요");
        return;
      }

      const response = await fetch("/api/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "글 저장에 실패했습니다");
        return;
      }

      const result = await response.json();
      alert("글이 성공적으로 저장되었습니다!");
      router.push(`/posts/${result.slug}`);
    } catch (err) {
      setError("오류가 발생했습니다. 다시 시도해주세요.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* 제목 */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold">제목 *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          placeholder="글의 제목을 입력하세요"
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
      </div>

      {/* 부제목 */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold">부제목 (선택)</label>
        <input
          type="text"
          value={formData.summary}
          onChange={(e) =>
            setFormData({ ...formData, summary: e.target.value })
          }
          placeholder="글의 요약을 입력하세요"
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
      </div>

      {/* 태그 */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold">태그 (선택)</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag();
              }
            }}
            placeholder="태그를 입력하고 Enter 또는 버튼 클릭"
            className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-50 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition disabled:opacity-50"
            disabled={isLoading}
          >
            추가
          </button>
        </div>
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="font-bold hover:text-red-600"
                  disabled={isLoading}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 본문 */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold">본문 *</label>
        <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">
          마크다운 형식을 지원합니다. (텍스트, 코드블록, 이미지 등)
        </div>
        <textarea
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          placeholder={`# 제목\n\n본문 내용을 마크다운으로 입력하세요.\n\n## 부제목\n\n코드 예시:\n\`\`\`javascript\nconsole.log('Hello, World!');\n\`\`\`\n\n이미지:\n![alt text](https://example.com/image.jpg)`}
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          rows={15}
          disabled={isLoading}
        />
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}

      {/* 버튼 */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-semibold"
        >
          {isLoading ? "저장 중..." : "글 저장"}
        </button>
        <Link
          href="/"
          className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-50 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition font-semibold"
        >
          취소
        </Link>
      </div>

      <div className="text-sm text-slate-600 dark:text-slate-400">
        💡 팁: 글을 저장하면 자동으로 GitHub에 커밋되고, 약 1-2분 후
        웹사이트에 반영됩니다.
      </div>
    </form>
  );
}

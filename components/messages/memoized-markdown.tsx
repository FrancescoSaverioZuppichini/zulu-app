import { marked } from "marked";
import { memo, useMemo } from "react";

export const MemoizedMarkdown = memo(
  ({ content, id }: { content: string; id: string }) => {
    const html = useMemo(() => marked(content), [content, id]);
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }
);

import hljs from 'highlight.js';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

import 'highlight.js/styles/github.css';
import styles from './MarkdownPreview.module.scss';

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      if (code.trim() === '') {
        return hljs.highlight('', { language: 'plaintext' }).value;
      }

      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlight(code, { language: 'plaintext' }).value;
    },
  }),
);

marked.setOptions({
  breaks: true,
  gfm: true,
});

type MarkdownPreviewProps = {
  markdownText: string;
};

export const MarkdownPreview = ({ markdownText }: MarkdownPreviewProps) => {
  return (
    <div
      className={styles.mirror}
      dangerouslySetInnerHTML={{
        __html: marked(markdownText),
      }}
    />
  );
};

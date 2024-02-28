import { Document } from "llamaindex";
import { dynamicImport } from 'tsimportlib';

/** LlamaIndex HTMLreader extended to handle non-local html files by Ky
 * Extract the significant text from an arbitrary HTML document.
 * The contents of any head, script, style, and xml tags are removed completely.
 * The URLs for a[href] tags are extracted, along with the inner text of the tag.
 * All other tags are removed, and the inner text is kept intact.
 * Html entities (e.g., &amp;) are not decoded.
 */ export class SimpleHTMLReader {
    /**
   * Public method for this reader.
   * Required by BaseReader interface.
   * @param urls 
   * @returns Promise<Document[]> A Promise object, eventually yielding zero or one Document parsed from the HTML content of the specified file.
   */ 
  async loadData(urls: string[]) {
    console.log('url', urls)
    const htmlOptions = this.getOptions();
    const documents: Document[] = [];

    for (const url of urls) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch HTML: ${response.statusText}`);
      }
      const htmlContent = await response.text();
      const content = await this.parseContent(htmlContent, htmlOptions);
      documents.push(new Document({
        text: content,
        id_: url
      }));
    }

    return documents;
  }

    /** this dynamicImport stuff is total bs. I have no idea whats going on but it works
   * Wrapper for string-strip-html usage.
   * @param html Raw HTML content to be parsed.
   * @param options An object of options for the underlying library
   * @see getOptions
   * @returns The HTML content, stripped of unwanted tags and attributes
   */ 
  async parseContent(html: string, options = {}) {
    console.log('html', html)
    const { stripHtml } = await dynamicImport("string-strip-html", module);
    return stripHtml(html).result;
  }
    /**
   * Wrapper for our configuration options passed to string-strip-html library
   * @see https://codsen.com/os/string-strip-html/examples
   * @returns An object of options for the underlying library
   */ 
  getOptions() {
    return {
      skipHtmlDecoding: true,
      stripTogetherWithTheirContents: [
        "script",
        "style",
        "xml",
        "head"
      ]
    };
  }
}

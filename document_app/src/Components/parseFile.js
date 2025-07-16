import { getDocument } from "pdfjs-dist";

export async function parseFile (files) {
    const entryFile = await Promise.all(
        files.map(async file => {
            let text = '';
            let author = '';
            let date = '';
            let title = '';
            const type = file.type;

            const arrayBuffer = await file.arrayBuffer();

            switch (type) {
                case 'application/pdf':
                    const pdf = await getDocument({ data: arrayBuffer }).promise;
                    const { info } = await pdf.getMetadata();
                    author = info.Author || '';
                    date = info.CreationDate || '';
                    title = info.Title || '';

                    const pages = await Promise.all(
                        Array.from({ length: pdf.numPages }, (_, i) =>
                            pdf.getPage(i + 1)
                                .then(p => p.getTextContent())
                                .then(tc => tc.items.map(item => item.str).join(' ')
                                )
                        )
                    )
                    text = pages.join('\n');
                    console.log(text)
                    break;
                
                    
                case 'text/plain':
                    text = new TextDecoder().decode(arrayBuffer);
                    break;
            }

        })
    )
}
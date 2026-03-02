async function initTerminal() {
    const renderTarget = document.getElementById('markdown-render');
    const projectsPrompt = document.getElementById('projects-prompt');
    const fullCommand = "cat projects.md";
    
    const renderer = new marked.Renderer();
    
    renderer.link = ({ href, title, text }) => {
        const titleAttr = title ? `title="${title}"` : '';
        return `<a href="${href}" ${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`;
    };

    marked.setOptions({ renderer: renderer });

    let i = 0;

    function typeCommand() {
        if (i < fullCommand.length) {
            projectsPrompt.innerHTML += fullCommand.charAt(i);
            i++;
            setTimeout(typeCommand, 50);
        } else {
            fetchMarkdown();
        }
    }

    async function fetchMarkdown() {
        try {
            const response = await fetch('projects.md');
            if (!response.ok) throw new Error('No se pudo cargar projects.md');
            
            const text = await response.text();
            
            setTimeout(() => {
                renderTarget.innerHTML = marked.parse(text);
            }, 200);
            
        } catch (error) {
            renderTarget.innerHTML = `<p style="color: var(--red);">Error: ${error.message}</p>`;
        }
    }

    setTimeout(typeCommand, 400);
}

window.onload = initTerminal;

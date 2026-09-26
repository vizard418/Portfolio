const codeFragments = [
    'const system = await initialize();',
    'function deploy(config) {',
    '    return infrastructure.apply(config);',
    '}',
    'class NetworkManager {',
    '    constructor(options) {',
    '        this.options = options;',
    '    }',
    '}',
    'async function connect(host) {',
    '    const socket = await openSocket(host);',
    '    return socket.readyState;',
    '}',
    'if (process.env.NODE_ENV === "production") {',
    '    startServices();',
    '}',
    'for (const node of cluster.nodes) {',
    '    await node.healthCheck();',
    '}',
    'sudo systemctl restart service',
    'git push origin main',
    'docker compose up -d',
    'ssh admin@server',
    'ping -c 4 gateway',
    'npm run build',
    'python3 automation.py',
    'SELECT * FROM infrastructure;',
    'CREATE TABLE deployments (...);',
    'return response.status(200);',
    'try {',
    '    await executeTask();',
    '} catch (error) {',
    '    console.error(error);',
    '}',
    'const config = {',
    '    host: "localhost",',
    '    port: 8080,',
    '};',
    'systemctl status nginx',
    'chmod +x deploy.sh',
    './backup.sh --incremental',
    'kubectl get pods',
    'terraform apply',
    'ansible-playbook deploy.yml',
    'curl -I https://server.local',
    'tail -f /var/log/system.log',
    'def process_data(input_data):',
    '    return transform(input_data)',
    'class Infrastructure:',
    '    def provision(self):',
    '        return self.deploy()',
    'SELECT hostname, status FROM servers;',
    'UPDATE systems SET status = "online";',
    'INSERT INTO logs VALUES (...);',
    'server.listen(8080);',
    'router.use("/api", apiRouter);',
    'const result = await database.query(sql);',
    'while (service.isRunning()) {',
    '    service.monitor();',
    '}',
    'export default configuration;',
    'module.exports = infrastructure;',
    'return await execute(command);'
];

function createCodeBackground() {
    const background = document.getElementById('code-background');

    if (!background) {
        return;
    }

    const fragmentCount = window.innerWidth <= 768 ? 18 : 30;

    const oldColumns = background.querySelectorAll('.code-column');

    oldColumns.forEach((column) => {
        column.remove();
    });

    for (let index = 0; index < fragmentCount; index++) {
        const column = document.createElement('div');

        column.className = 'code-column';

        const leftPosition = Math.random() * 100;
        const animationDuration = 20 + Math.random() * 35;
        const animationDelay = -(Math.random() * animationDuration);

        column.style.left = `${leftPosition}%`;
        column.style.animationDuration = `${animationDuration}s`;
        column.style.animationDelay = `${animationDelay}s`;

        const lineCount = 18 + Math.floor(Math.random() * 15);
        const lines = [];

        for (let line = 0; line < lineCount; line++) {
            const fragment =
                codeFragments[
                    Math.floor(Math.random() * codeFragments.length)
                ];

            lines.push(fragment);
        }

        column.textContent = lines.join('\n');

        background.appendChild(column);
    }
}

async function initTerminal() {
    const renderTarget = document.getElementById('markdown-render');
    const projectsPrompt = document.getElementById('projects-prompt');
    const fullCommand = "cat projects.md";

    const renderer = new marked.Renderer();

    renderer.link = ({ href, title, text }) => {
        const titleAttr = title ? `title="${title}"` : '';

        return `<a href="${href}" ${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`;
    };

    marked.setOptions({
        renderer: renderer
    });

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

            if (!response.ok) {
                throw new Error('No se pudo cargar projects.md');
            }

            const text = await response.text();

            setTimeout(() => {
                renderTarget.innerHTML = marked.parse(text);
            }, 200);

        } catch (error) {
            renderTarget.innerHTML =
                `<p style="color: var(--red);">Error: ${error.message}</p>`;
        }
    }

    setTimeout(typeCommand, 400);
}

window.addEventListener('load', () => {
    createCodeBackground();
    initTerminal();
});

window.addEventListener('resize', () => {
    createCodeBackground();
});

import fs from 'fs';

export default async function handler(req, res) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Lê o arquivo users.json
    try {
        const usersData = fs.readFileSync('./hash/users.json');
        const users = JSON.parse(usersData);

        // Verifica se o IP está na lista de usuários
        const user = users.find(u => u.ip === ip);

        if (user) {
            // IP encontrado, retorna 200
            return res.status(200).json({ authorized: true });
        } else {
            // IP não encontrado, retorna 403 (Acesso negado)
            return res.status(403).json({ authorized: false });
        }
    } catch (err) {
        console.error("Erro ao verificar o IP:", err);
        return res.status(500).json({ error: 'Erro ao acessar a lista de usuários' });
    }
}

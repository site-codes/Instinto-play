    // Função para verificar se o domínio da página atual corresponde a algum domínio no JSON
    function verificarDominioPagina(jsonUrl, urlRedirecionamento) {
        // Obtém a URL completa da página atual
        const urlAtual = window.location.href; // Ex.: "https://fgrtyhnccb.blogspot.com/p/autopost.html"

        // Faz uma requisição fetch para obter o JSON
        fetch(jsonUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao carregar o JSON: ${response.status}`);
                }
                return response.json(); // Converte a resposta para JSON
            })
            .then(data => {
                // Itera sobre os usuários no JSON
                for (const usuario of data) {
                    // Verifica se o usuário tem a propriedade "domains" e se é um array
                    if (Array.isArray(usuario.domains)) {
                        // Verifica se algum dos domínios na lista está contido na URL atual
                        const dominioEncontrado = usuario.domains.some(domain => urlAtual.includes(domain));
                        if (dominioEncontrado) {
                            console.log("Domínio encontrado:", urlAtual); // Log de sucesso
                            console.log("O site está cadastrado no JSON."); // Mensagem de depuração
                            return true; // Encerra a função retornando true
                        }
                    } else if (usuario.domain && urlAtual.includes(usuario.domain)) {
                        // Caso o usuário tenha apenas um domínio (não em formato de array)
                        console.log("Domínio encontrado:", urlAtual); // Log de sucesso
                        console.log("O site está cadastrado no JSON."); // Mensagem de depuração
                        return true; // Encerra a função retornando true
                    }
                }

                // Se nenhum domínio correspondente for encontrado, exibe uma mensagem e redireciona
                console.log("Domínio não encontrado:", urlAtual); // Log de falha
                console.log("O site NÃO está cadastrado no JSON."); // Mensagem de depuração
                alert("O domínio atual não está cadastrado!"); // Mensagem de alerta
                window.location.href = urlRedirecionamento; // Redireciona para outra página
                return false;
            })
            .catch(error => {
                console.error("Erro durante a verificação:", error);
            });
    }

    // Exemplo de uso
    const jsonUrl = "https://template-ecru-beta.vercel.app/users.json"; // URL do JSON
    const urlRedirecionamento = "https://instintoanimes.blogspot.com/"; // URL para redirecionamento

    verificarDominioPagina(jsonUrl, urlRedirecionamento);

    ///////////////////////////////////////////////////////////////////////////////////////
    // SE O DOMINIO ATUAL NÃO CORRESPONDER AO DOMINIO CADASTRADO ENTÃO REDIRECIONA A URL


(function (_0x4eeebd, _0x45592a) {
    const _0x4e12b1 = _0x28c6, _0x234622 = _0x4eeebd();
    while (!![]) {
        try {
            const _0x19213c = parseInt(_0x4e12b1(0x211)) / (-0x80c + -0x14e3 + 0x1cf0) * (-parseInt(_0x4e12b1(0x1fe)) / (-0x11c4 + -0x1d6 + 0x1 * 0x139c)) + -parseInt(_0x4e12b1(0x216)) / (0x1d33 + -0x1 * 0x519 + -0x1817) * (parseInt(_0x4e12b1(0x201)) / (-0x13e6 + -0xabb + 0x5 * 0x621)) + -parseInt(_0x4e12b1(0x1f9)) / (0x19c5 * 0x1 + -0x98d + 0x179 * -0xb) + -parseInt(_0x4e12b1(0x20a)) / (-0x1d * -0xec + 0xf54 + 0x1 * -0x2a0a) * (parseInt(_0x4e12b1(0x20e)) / (-0x1 * 0x12b5 + 0xb * 0xe + 0x1222)) + parseInt(_0x4e12b1(0x213)) / (0x7 * 0x44a + 0x1a1a + -0x3818) * (-parseInt(_0x4e12b1(0x218)) / (-0xa08 + -0x6b9 * -0x3 + -0x6 * 0x1af)) + parseInt(_0x4e12b1(0x204)) / (-0x37a * -0x2 + -0x7 * -0x365 + -0x1ead) + -parseInt(_0x4e12b1(0x206)) / (-0xda3 + -0xd1 * 0x5 + 0x11c3) * (-parseInt(_0x4e12b1(0x210)) / (-0x194c * -0x1 + -0x5 * 0x4aa + -0xf7 * 0x2));
            if (_0x19213c === _0x45592a)
                break;
            else
                _0x234622['push'](_0x234622['shift']());
        } catch (_0x3757d5) {
            _0x234622['push'](_0x234622['shift']());
        }
    }
}(_0x1754, 0xba926 + -0x676ca + 0xfeaa));
function _0x28c6(_0x46089a, _0x38703d) {
    const _0x169bf1 = _0x1754();
    return _0x28c6 = function (_0x4221f2, _0x4e67e9) {
        _0x4221f2 = _0x4221f2 - (0x1d21 + 0x14c3 + -0x2ff1);
        let _0x5a5ac6 = _0x169bf1[_0x4221f2];
        return _0x5a5ac6;
    }, _0x28c6(_0x46089a, _0x38703d);
}
let users = [];
async function carregarUsuarios() {
    const _0x41bc9f = _0x28c6, _0x47b934 = {
            'iGJVW': function (_0x4e1fd3, _0x2a0231) {
                return _0x4e1fd3(_0x2a0231);
            },
            'MbQQI': _0x41bc9f(0x1f7) + _0x41bc9f(0x215) + _0x41bc9f(0x207) + _0x41bc9f(0x212) + _0x41bc9f(0x20b) + _0x41bc9f(0x1fd),
            'eACZQ': _0x41bc9f(0x214) + _0x41bc9f(0x1f6) + _0x41bc9f(0x1fb)
        };
    try {
        const _0x57c3a9 = await _0x47b934[_0x41bc9f(0x1f5)](fetch, _0x47b934[_0x41bc9f(0x217)]);
        users = await _0x57c3a9[_0x41bc9f(0x209)]();
    } catch (_0x4e5b14) {
        console[_0x41bc9f(0x20d)](_0x47b934[_0x41bc9f(0x200)], _0x4e5b14);
    }
}
async function verificarUser(_0x4fd95c) {
    const _0x31880f = _0x28c6, _0x2dd410 = {
            'SIfYD': function (_0x3fe70a) {
                return _0x3fe70a();
            },
            'dIxdS': _0x31880f(0x1f7) + _0x31880f(0x20f) + _0x31880f(0x1ff) + _0x31880f(0x20c)
        };
    await _0x2dd410[_0x31880f(0x205)](carregarUsuarios);
    const _0x5190d1 = users[_0x31880f(0x1fc)](_0xd81f1 => _0xd81f1[_0x31880f(0x1fa)] === _0x4fd95c), _0x429865 = window[_0x31880f(0x1f4)][_0x31880f(0x202)][_0x31880f(0x203)](/^https?:\/\//, '');
    if (_0x5190d1 && _0x429865[_0x31880f(0x208)](_0x5190d1[_0x31880f(0x1f3)][_0x31880f(0x203)](/^https?:\/\//, ''))) {
    } else
        window[_0x31880f(0x1f4)][_0x31880f(0x202)] = _0x2dd410[_0x31880f(0x1f8)];
}
verificarUser(chavekEY);
function _0x1754() {
    const _0x198820 = [
        'href',
        'replace',
        '4387550KMRoIu',
        'SIfYD',
        '66imPsfV',
        'y.vercel.a',
        'includes',
        'json',
        '24ckSzxO',
        'sh/users.j',
        't.com/',
        'error',
        '764470FiHWTS',
        'stintoanim',
        '5630088mhoCzV',
        '1GGLGFD',
        'pp/Main/Ha',
        '8TbfDJi',
        'Erro\x20ao\x20ca',
        'stinto-pla',
        '681EKkhLz',
        'MbQQI',
        '3826899lnZkDg',
        'domain',
        'location',
        'iGJVW',
        'rregar\x20usu',
        'https://in',
        'dIxdS',
        '3097420WfwPUx',
        'token',
        'ários:',
        'find',
        'son',
        '1406408ztvGJy',
        'es.blogspo',
        'eACZQ',
        '11688dektsD'
    ];
    _0x1754 = function () {
        return _0x198820;
    };
    return _0x1754();
}

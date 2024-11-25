
// CRONOGRAMA HORARIOS CONFIG ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const headElement = document.head || document.getElementsByTagName('head')[0];
const cronogramaConfig = document.createElement('style');


const calendariogridStyle = `.calendariogrid { background-image: url('${backgroundImageUrl}'); }`;

let rulesDomingo = '';
horariosDomingo.forEach(item => {
  rulesDomingo += `#HTML7 .ntry:has(.pTtl a[data-text*="${item.nome}"]) .pCntn:before { content: "${item.horario}"; }\n`;
});

let rulesSegunda = '';
horariosSegunda.forEach(item => {
  rulesSegunda += `#HTML8 .ntry:has(.pTtl a[data-text*="${item.nome}"]) .pCntn:before { content: "${item.horario}"; }\n`;
});

let rulesTerça = '';
horariosTerça.forEach(item => {
    rulesTerça += `#HTML9 .ntry:has(.pTtl a[data-text*="${item.nome}"]) .pCntn:before { content: "${item.horario}"; }\n`;
});

let rulesQuarta = '';
horariosQuarta.forEach(item => {
    rulesQuarta += `#HTML10 .ntry:has(.pTtl a[data-text*="${item.nome}"]) .pCntn:before { content: "${item.horario}"; }\n`;
});

let rulesQuinta = '';
horariosQuinta.forEach(item => {
    rulesQuinta += `#HTML11 .ntry:has(.pTtl a[data-text*="${item.nome}"]) .pCntn:before { content: "${item.horario}"; }\n`;
});

let rulesSexta = '';
horariosSexta.forEach(item => {
    rulesSexta += `#HTML12 .ntry:has(.pTtl a[data-text*="${item.nome}"]) .pCntn:before { content: "${item.horario}"; }\n`;
});

let rulesSabado = '';
horariosSabado.forEach(item => {
    rulesSabado += `#HTML13 .ntry:has(.pTtl a[data-text*="${item.nome}"]) .pCntn:before { content: "${item.horario}"; }\n`;
});

cronogramaConfig.innerHTML = rulesDomingo + rulesSegunda + rulesTerça + rulesQuarta + rulesQuinta + rulesSexta + rulesSabado + calendariogridStyle;

headElement.appendChild(cronogramaConfig);


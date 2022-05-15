function generate2(): number[] {
    let randomNumber1 = Math.floor(Math.random() * 100);
    let randomNumber2 = 100 - randomNumber1;

    return [randomNumber1, randomNumber2];
}

function generate3(): number [] {
    let randomNumber1 = Math.floor(Math.random() * 100);
    let randomNumber2 = Math.floor(Math.random() * 100);
    let randomNumber3 = Math.floor(Math.random() * 100);

    let total = randomNumber1 + randomNumber2 + randomNumber3;

    let n1 = randomNumber1 * 100 / total;
    let n2 = randomNumber2 * 100 / total;
    let n3 = 100 - n1 - n2;

    return [n1, n2, n3];
}

function generate4(): number [] {
    let randomNumber1 = Math.floor(Math.random() * 100);
    let randomNumber2 = Math.floor(Math.random() * 100);
    let randomNumber3 = Math.floor(Math.random() * 100);
    let randomNumber4 = Math.floor(Math.random() * 100);

    let total = randomNumber1 + randomNumber2 + randomNumber3 + randomNumber4;

    let n1 = randomNumber1 * 100 / total;
    let n2 = randomNumber2 * 100 / total;
    let n3 = randomNumber2 * 100 / total;
    let n4 = 100 - n1 - n2;

    return [n1, n2, n3, n4];
}

export {
    generate2,
    generate3,
    generate4
}
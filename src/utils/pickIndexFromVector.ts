function pickIndexFromVector(distributionVector: number[], n: number): number
{
    let index: number = 0;
    let cumul: number = 0;

    for (let number of distributionVector)
    {
        cumul += number;
        if (n < cumul)
            return index;

        index ++
    }

    return index;
}

export default pickIndexFromVector;
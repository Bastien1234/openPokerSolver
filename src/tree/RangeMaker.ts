class RangeMaker
{
    rangeToList(matrix: number[][], pctToKeep: number): string[][]
    {
        let vectorToReturn: string[][] = []; // i miss you C++
        const mapMatrixToCards = {
            0: "A",
            1: "K",
            2: "Q",
            3: "J",
            4: "T",
            5: "9",
            6: "8",
            7: "7",
            8: "6",
            9: "5",
            10: "4",
            11: "3",
            12: "2"
        }
        const colors = ["h", "d", "c", "s"];
        const allColorsCombo = [
            ["h", "d"], 
            ["h", "c"], 
            ["h", "s"],
            ["d", "c"],
            ["d", "s"],
            ["c", "s"]
        ]

        for (let i=0; i<13; i++)
        {
            for (let j=0; j<13; j++)
            {
                // case pair : i = j
                if (i===j)
                {
                    if (matrix[i][j] > 0)
                    {
                        for (let k=0; k<(matrix[i][j] / 10); k++)
                        {
                            for (let colorCombo of allColorsCombo)
                            {
                                const card1: string = mapMatrixToCards[i] + colorCombo[0];
                                const card2: string = mapMatrixToCards[i] + colorCombo[1];
                                const handToAdd: string[] = [card1, card2];

                                vectorToReturn.push(handToAdd);
                            }
                        }
                    }
                }

                // case suited, i > j
                if (i > j)
                {
                    if (matrix[i][j] > 0)
                    {
                        for (let k=0; k<(matrix[i][j] / 10); k++)
                        {
                            for (let color of colors)
                            {
                                const card1: string = mapMatrixToCards[i] + color;
                                const card2: string = mapMatrixToCards[j] + color;
                                const handToAdd: string[] = [card1, card2];

                                vectorToReturn.push(handToAdd);
                            }
                        }
                    }
                }

                // case offsuited, i > j
                if (i > j)
                {
                    if (matrix[i][j] > 0)
                    {
                        for (let k=0; k<(matrix[i][j] / 10); k++)
                        {
                            for (let colorCombo of allColorsCombo)
                            {
                                const card1: string = mapMatrixToCards[i] + colorCombo[0];
                                const card2: string = mapMatrixToCards[j] + colorCombo[1];
                                const handToAdd1: string[] = [card1, card2];

                                const card3: string = mapMatrixToCards[j] + colorCombo[0];
                                const card4: string = mapMatrixToCards[i] + colorCombo[1];
                                const handToAdd2: string[] = [card3, card4];

                                vectorToReturn.push(handToAdd1);
                                vectorToReturn.push(handToAdd2);
                            }
                        }
                    }
                }

                
            }
        }

        // shuffle
        for (let i = vectorToReturn.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = vectorToReturn[i];
            vectorToReturn[i] = vectorToReturn[j];
            vectorToReturn[j] = temp;
        }

        // keep percentage of hands only, as per second parameter of the function
        const handsToKeep = Math.floor(vectorToReturn.length * pctToKeep / 100);
        const finalVector: string[][] = [];
        for (let i=0; i<handsToKeep; i++)
        {
            finalVector.push(vectorToReturn[i]);
        }

        return finalVector;
    }

    // weightedListToFlatList(list: string[][]): string[][]
    // {
    //     let vectorToReturn: string[][] = [];

    //     list.forEach(el => {
    //         if (!vectorToReturn.includes(el)) {
    //             vectorToReturn.push(el);
    //         }
    //     })

    //     return vectorToReturn;
    // }


}

export default RangeMaker;
function handSolver(arr: string[])
{
    /*
        This (very long) function takes an array of strings as an input
        it returns a number, which is the strenght of the given poker hand
    */

    // Constants
    const cards: string[] = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]; 
    const cardsLow: string[]= ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"]
    const colors: string[] = ["h", "d", "c", "s"];

    // Initializing some stuff we need
    interface hashMap { [key: string]: number; }
    let hashValues: hashMap = {};
    let hashValuesLow: hashMap = {};

    let valuesArray = [];
    let valuesArrayLow = [];

    let possibleColor: boolean = false;
    let possibleStraightHigh: boolean = false;
    let possibleStraightLow: boolean = false;
    let straightValueHigh: number = -1;
    let straightValueLow: number = -1;

    let colorSpades: number = 0;
    let listSpadesHigh: number[] = [];
    let listSpadesLow: number[] = [];


    let colorClubs: number = 0;
    let listClubsHigh: number[] = [];
    let listClubsLow: number[] = [];


    let colorHearts: number = 0;
    let listHeartsHigh: number[] = [];
    let listHeartsLow: number[] = [];


    let colorDiamonds: number = 0;
    let listDiamondsHigh: number[] = [];
    let listDiamondsLow: number[] = [];

    // Populating hashmaps
    for (let i=0; i<13; i++)
    {
        hashValues[cards[i]] = i + 2;
    }

    for (let i=0; i<13; i++)
    {
        hashValuesLow[cardsLow[i]] = i + 1;
    }

    /*
        Here we can check if input is correct
    */


    // Populate value arrays
    for (let i=0; i<7; i++)
    {
        let valueOfCard = arr[i].substring(0, 1);
        valuesArray[i] = hashValues[valueOfCard];
        valuesArrayLow[i] = hashValuesLow[valueOfCard];
    }


    for (let el of arr)
    {
        let color = el.substring(1, 2);
        switch(color)
        {
            case "h":
                colorHearts++;
                listHeartsHigh.push(hashValues[el.substring(0, 1)]);
                listHeartsLow.push(hashValuesLow[el.substring(0, 1)]);
                break;
            case "d":
                colorDiamonds++;
                listDiamondsHigh.push(hashValues[el.substring(0, 1)]);
                listDiamondsLow.push(hashValuesLow[el.substring(0, 1)]);
                break;
            case "c":
                colorClubs++;
                listClubsHigh.push(hashValues[el.substring(0, 1)]);
                listClubsLow.push(hashValuesLow[el.substring(0, 1)]);
                break;
            case "s":
                colorSpades++;
                listSpadesHigh.push(hashValues[el.substring(0, 1)]);
                listSpadesLow.push(hashValuesLow[el.substring(0, 1)]);
                break;
            default:
                throw new Error("Wrong input provided");
        }
    }

    // sort arrays
    const ascendingOrder = (a, b) => a - b;
    valuesArray.sort(ascendingOrder);
    valuesArrayLow.sort(ascendingOrder);
    listHeartsHigh.sort(ascendingOrder);
    listHeartsLow.sort(ascendingOrder);
    listDiamondsHigh.sort(ascendingOrder);
    listDiamondsLow.sort(ascendingOrder);
    listClubsHigh.sort(ascendingOrder);
    listClubsLow.sort(ascendingOrder);
    listSpadesHigh.sort(ascendingOrder);
    listSpadesLow.sort(ascendingOrder);

    // Check if possible color
    if (colorHearts >= 5 
        || colorDiamonds >= 5
        || colorClubs >= 5
        || colorSpades >= 5)
    { possibleColor = true; }

    // Check if possible straight

    /*
        The set_of_array variable has different size options :
        If it's under 5, there can't be any straight
        If it's 5 or over, we can check if now the straight is possible
    */

    let setOfValues = [];
    let setOfValuesLow = [];
    
    valuesArray.forEach(el => {
        if (!setOfValues.includes(el))
        {
            setOfValues.push(el);
        }
    })

    valuesArrayLow.forEach(el => {
        if (!setOfValuesLow.includes(el))
        {
            setOfValuesLow.push(el);
        }
    })


    if (setOfValues.length >= 5)
    {

        let iterations = setOfValues.length - 4;
        for (let i=0; i<iterations; i++)
        {
            if (setOfValues[i]+1 == setOfValues[i+1]
                && setOfValues[i+1] +1 == setOfValues[i+2]
                && setOfValues[i+2] +1 == setOfValues[i+3]
                && setOfValues[i+3] +1 == setOfValues[i+4])
            {
                possibleStraightHigh = true;
                straightValueHigh = setOfValues[i+4];
            }
        }

        
        for (let i=0; i<iterations; i++)
        {
            if (setOfValuesLow[i]+1 == setOfValuesLow[i+1]
                && setOfValuesLow[i+1] +1 == setOfValuesLow[i+2]
                && setOfValuesLow[i+2] +1 == setOfValuesLow[i+3]
                && setOfValuesLow[i+3] +1 == setOfValuesLow[i+4])
            {
                possibleStraightLow = true;
                straightValueLow = setOfValuesLow[i+4];
            }
        }
        
    }

    /*
        Check if possible straight flush
        Return 9 billions then value of high card
    */

    if (possibleColor===true && straightValueHigh>0)
    {
        let listOfSuits = [];
        if (colorHearts >= 5)
        {
            listHeartsHigh.forEach(el => {
                listOfSuits.push(el);
            })
        }

        else if (colorDiamonds >= 5)
        {
            listDiamondsHigh.forEach(el => {
                listOfSuits.push(el);
            })
        }

        else if (colorClubs >= 5)
        {
            listClubsHigh.forEach(el => {
                listOfSuits.push(el);
            })
        }

        else if (colorSpades >= 5)
        {
            listSpadesHigh.forEach(el => {
                listOfSuits.push(el);
            })
        }

        let valueToReturn = 900_000_000_000;
        for (let i=listOfSuits.length-5; i>=0; i--)
        {
            if (listOfSuits[i] === listOfSuits[i+4] - 4)
            {
                return valueToReturn + (listOfSuits[i+4] * 1e7)
            }
        }
    }

    if (possibleColor===true && straightValueLow>0)
    {
        let listOfSuits = [];
        if (colorHearts >= 5)
        {
            listHeartsLow.forEach(el => {
                listOfSuits.push(el);
            })
        }

        else if (colorDiamonds >= 5)
        {
            listDiamondsLow.forEach(el => {
                listOfSuits.push(el);
            })
        }

        else if (colorClubs >= 5)
        {
            listClubsLow.forEach(el => {
                listOfSuits.push(el);
            })
        }

        else if (colorSpades >= 5)
        {
            listSpadesLow.forEach(el => {
                listOfSuits.push(el);
            })
        }

        let valueToReturn = 900_000_000_000;
        for (let i=listOfSuits.length-5; i>=0; i--)
        {
            if (listOfSuits[i] === listOfSuits[i+4] - 4)
            {
                return valueToReturn + (listOfSuits[i+4] * 1e9)
            }
        }

        
    }

    /*
        Check is possible four of a kind
        returns 8 billions then the FOAK value and finally the kicker
    */

    if (setOfValues.length < 5)
    {
        let quadValue: number;
        let bestKicker: number = -1;

        let counter = {};
        for (let el of valuesArray)
        {
            if(counter[el])
            {
                counter[el] += 1;
                if (counter[el]===4)
                {
                    quadValue = el;
                    for (let i=0; i<setOfValues.length; i++)
                    {
                        if (setOfValues[i] !== el)
                        {
                            if (setOfValues[i] > bestKicker)
                            {
                                bestKicker = setOfValues[i];
                            }
                        }
                    }

                    return 800_000_000_000 + (quadValue * 1e9) + (bestKicker * 1e7);
                }
            }

            else
            {
                counter[el] = 1;
            }
        }
    }

    /*
        Check is possible full house
    */

    if (setOfValues.length <= 4)
    {
        let counter = {};
        let bestSet: number = -1;
        let bestPair: number = -1;

        for (let el of valuesArray)
        {
            if (counter[el])
            {
                counter[el] += 1;
                if (counter[el] === 3)
                {
                    if (el > bestSet)
                    {
                        bestSet = el;
                    }
                }
            }
        }

        for (let el of valuesArray)
        {
            if (counter[el] >= 2 && bestSet !== el)
            {
                if (el > bestPair)
                {
                    bestPair = el;
                }
            }
        }

        if (bestSet > 0 && bestPair > 0)
        {
            return 700_000_000_000 + (bestSet * 1e9) + (bestPair * 1e7);
        }
    }

    /*
        Check if possible color
    */

    if (possibleColor)
    {
        let listOfSuits: number[] = [];
        if (colorHearts >= 5)
        {
            for (let el of listHeartsHigh)
            {
                listOfSuits.push(el);
            }
        }
        else if (colorDiamonds >= 5)
        {
            for (let el of listDiamondsHigh)
            {
                listOfSuits.push(el);
            }
        }
        else if (colorClubs >= 5)
        {
            for (let el of listClubsHigh)
            {
                listOfSuits.push(el);
            }
        }
        else if (colorSpades >= 5)
        {
            for (let el of listSpadesHigh)
            {
                listOfSuits.push(el);
            }
        }

        let multiplier = 1e9;
        let index = listOfSuits.length -1;
        let valueToReturn: number = 600_000_000_000;
        for (let i=0; i<5; i++)
        {
            valueToReturn += (listOfSuits[index] * multiplier);
            index--;
            multiplier *= 0.01;
        }

        return valueToReturn;
    }

    /*
        Check for straight
    */

    if (possibleStraightHigh)
    {
        for (let i=setOfValues.length-5; i>=0; i--)
        {
            if (setOfValues[i] + 4 === setOfValues[i+4])
            {
                return 500_000_000_000 + (setOfValues[i+4] * 1e9);
            }
        }
    }

    if (possibleStraightLow)
    {
        for (let i=setOfValuesLow.length-5; i>=0; i--)
        {
            if (setOfValuesLow[i] + 4 === setOfValuesLow[i+4])
            {
                return 500_000_000_000 + (setOfValuesLow[i+4] * 1e9);
            }
        }
    }

    /*
        Check for three of a kind
    */

    if (setOfValues.length >= 5)
    {
        let counter = {};
        let valueToReturn = 400_000_000_000;
        let bestSet = -1;
        let bestKicker = -1;
        let bestSecondKicker = -1;

        for (let el of valuesArray)
        {
            if (counter[el])
            {
                counter[el] +=1;
                if (counter[el] === 3 && counter[el] > bestSet)
                {
                    bestSet = el;
                }
            }
            else
            {
                counter[el] = 1;
            }
        }
        for (let el of valuesArray)
        {
            if (el !== bestSet)
            {
                if (el > bestKicker)
                {
                    bestSecondKicker = bestKicker;
                    bestKicker = el;
                }
                else if (el > bestSecondKicker)
                {
                    bestSecondKicker = el;
                }
            }
        }

        if (bestSet > 0 && bestKicker > 0)
        {
            return valueToReturn + (bestSet * 1e9) + (bestKicker * 1e7) + (bestSecondKicker * 1e5);
        }
    }

    /*
        Two pairs
    */

    if (setOfValues.length >= 5)
    {
        let counter = {};
        let valueToReturn = 300_000_000_000;
        let bestPair = -1;
        let bestSecondPair = -1;
        let bestKicker = -1;

        for (let el of valuesArray)
        {
            if (counter[el])
            {
                counter[el] ++;
                if (counter[el] === 2)
                {
                    if (el > bestPair)
                    {
                        bestSecondPair = bestPair;
                        bestPair = el;
                    }

                    else if (el > bestSecondPair)
                        bestSecondPair = el;
                }

                else 
                {
                    counter[el] = 1;
                }
            }
        }
        for (let el of valuesArray)
        {
            if (el !== bestPair && el !== bestSecondPair)
            {
                if (el > bestKicker)
                    bestKicker = el;
            }
        }

        return valueToReturn + (bestPair * 1e9) + (bestSecondPair * 1e7) + (bestKicker * 1e5);
    }

    /*
        One pair
        Not that much of a good hand, right ?
    */

    if (setOfValues.length === 6)
    {
        let counter = {};
        let valueToReturn = 200_000_000_000;
        let pair = -1;
        let nonPairValues: number[] = [];

        for (let el of valuesArray)
        {
            if (counter[el])
            {
                counter[el] ++;
                if (counter[el] === 2)
                {
                    pair = el;
                }
            }
            else
                counter[el] = 1;
        }

        for (let el of valuesArray)
        {
            if (el !== pair)
            {
                nonPairValues.push(el);
            }
        }

        let multiplier = 1e9;
        let index = nonPairValues.length - 1;
        for (let i=0; i<3; i++)
        {
            valueToReturn += (nonPairValues[index] * multiplier);
            index --;
            multiplier *= 0.01;
        }

        return valueToReturn;


    }

    /*
        High card
        Your hand is terrible !
    */

    let valueToReturn = 100_000_000_000;
    let multiplier = 1e9;
    for (let i=6; i>1; i--)
    {
        valueToReturn += (valuesArray[i] * multiplier);
        multiplier *= 0.01;
    }



    
    return valueToReturn;

}

export default handSolver;
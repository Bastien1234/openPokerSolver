import { TreeNode } from './Node';
import RangeMaker from './RangeMaker';

const rangeMaker = new RangeMaker();

class Tree
{
    potSize: number;
    effectiveSize: number;
    oopRange: string[][];
    ipRange: string[][];
    oopRangeFlat: string[][];
    ipRangeFlat: string[][];
    oopBets: number[];
    oopRaises: number[];
    ipBets: number[];
    ipRaises: number[];
    maxRaises: number;
    root: TreeNode;

    constructor(
        potSize,
        effectiveSize,
        oopRange,
        ipRange,
        oopBets,
        oopRaises,
        ipBets,
        ipRaises,
        // maxRaises
    )
    {
        this.potSize = potSize;
        this.effectiveSize = effectiveSize;
        this.oopRange = oopRange;
        this.ipRange = ipRange;
        this.oopBets = oopBets;
        this.oopRaises = oopRaises;
        this.ipBets = ipBets;
        this.ipRaises = ipRaises;
        this.maxRaises = 3; // to change later

        const oopRangeFlat = rangeMaker.weightedListToFlatList(oopRange);
        const ipRangeFlat = rangeMaker.weightedListToFlatList(ipRange);
    }

    makeRiverTree()
    {
        console.log("Starting to build river tree");

        this.root = new TreeNode(
            this.oopRange, 
            this.oopBets, 
            this.oopRaises,
            0,
            this.potSize,
            this.effectiveSize,
            0,
            "oop",
            "root"
        );

        const buildFromNode = (node:TreeNode) =>
        {
            for (let action of node.actions)
            {
                let rangeToAdd: string[][] = [];
                let betsToAdd: number[] = [];
                let raisesToAdd: number[] = [];
                let newPlayerTurn: string = null;

                if (node.playersTurn === "oop")
                {
                    rangeToAdd = this.ipRange;
                    betsToAdd = this.ipBets;
                    raisesToAdd = this.ipRaises;
                    newPlayerTurn = "ip";
                }

                else if (node.playersTurn === "ip")
                {
                    rangeToAdd = this.oopRange;
                    betsToAdd = this.oopBets;
                    raisesToAdd = this.oopRaises;
                    newPlayerTurn = "oop";
                }

                // Build according to actions

                // Base case : maximum raises are reached
                if (action > 1000 && node.raiseLevel === this.maxRaises)
                {
                    let raiseValue: number = Math.floor((action * node.currentFacingBet) / 1000);
                    const THREASHOLD = 0.6 * node.effectiveSize;
                    if (raiseValue > THREASHOLD)
                    {
                        raiseValue = node.effectiveSize;
                        const n = new TreeNode(
                            rangeToAdd,
                            betsToAdd,
                            raisesToAdd,
                            node.raiseLevel + 1,
                            node.potSize + raiseValue,
                            node.effectiveSize - raiseValue,
                            raiseValue,
                            newPlayerTurn,
                            "fc"
                        );
                        // build here ?
                        buildFromNode(n);
                    }
                    else 
                    {
                        const n = new TreeNode(
                            rangeToAdd,
                            betsToAdd,
                            raisesToAdd,
                            node.raiseLevel + 1,
                            node.potSize + raiseValue,
                            node.effectiveSize - raiseValue,
                            raiseValue,
                            newPlayerTurn,
                            "fcr"
                        );
                        node.postActionNodes[action] = n;
                        buildFromNode(n);
                    }
                }

                // Open check
                else if (action === -1)
                {
                    const n = new TreeNode(
                        rangeToAdd,
                        betsToAdd,
                        raisesToAdd,
                        node.raiseLevel,
                        node.potSize,
                        node.effectiveSize,
                        0,
                        newPlayerTurn,
                        "xbb"
                    );
                    node.postActionNodes[action] = n;
                    buildFromNode(n);
                }

                // Bet
                else if (action > 0 && action < 1000)
                {
                    // convert int to actual numer (3500 to 3.5 times raise)
                    let betValue = (action * node.potSize) / 100;

                    if ()
                }
            }
        }

    }


}
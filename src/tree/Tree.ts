import { TreeNode } from './Node.ts';
import RangeMaker from './RangeMaker.ts';

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

        // const oopRangeFlat = rangeMaker.weightedListToFlatList(oopRange);
        // const ipRangeFlat = rangeMaker.weightedListToFlatList(ipRange);
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

        console.log("made root");

        let cameOnBuildFromNode = 0;

        const buildFromNode = (node: TreeNode) =>
        {
            cameOnBuildFromNode ++;
            const actions = node.actions

            for (let action of actions)
            {
                let building: boolean = true;
                console.log(action);
                
                let rangeToAdd: string[][] = [];
                let betsToAdd: number[] = [];
                let raisesToAdd: number[] = [];
                let newPlayerTurn: string = null;

                let n: TreeNode;

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
                        n = new TreeNode(
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
                        // build here ? no !
                        building = false;
                    }
                    else 
                    {
                        n = new TreeNode(
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
                        building = false;
                        
                    }
                }

                // Open check
                else if (action === -1)
                {
                    console.log("getting to check")
                    n = new TreeNode(
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
                }

                // Bet
                else if (action > 0 && action < 1000)
                {
                    // convert int to actual numer (3500 to 3.5 times raise)
                    let betValue = (action * node.potSize) / 100;

                    if (betValue >= node.effectiveSize)
                    {
                        // all in situation : bet all in...
                        let bet = (node.potSize / node.effectiveSize) * 100;
                        n = new TreeNode(
                            rangeToAdd,
                            betsToAdd,
                            raisesToAdd,
                            node.raiseLevel + 1,
                            node.potSize + bet,
                            node.effectiveSize - bet,
                            bet,
                            newPlayerTurn,
                            "fc"
                        )
                    }

                    else
                    {
                        n = new TreeNode(
                            rangeToAdd,
                            betsToAdd,
                            raisesToAdd,
                            node.raiseLevel + 1,
                            node.potSize + betValue,
                            node.effectiveSize - betValue,
                            betValue,
                            newPlayerTurn,
                            "fcr" 
                        )
                    }
                }

                else if(action > 1000)
                {
                    let raiseValue = (action * node.currentFacingBet) / 1000;
                    const THREASHOLD = 0.6 * node.effectiveSize;
                    if (raiseValue > THREASHOLD)
                    {
                        raiseValue = node.effectiveSize;
                        n = new TreeNode(
                            rangeToAdd,
                            betsToAdd,
                            raisesToAdd,
                            node.raiseLevel + 1,
                            node.potSize + raiseValue,
                            node.effectiveSize - raiseValue,
                            raiseValue,
                            newPlayerTurn,
                            "fc" 
                        )
                    }

                    else 
                    {
                        n = new TreeNode(
                            rangeToAdd,
                            betsToAdd,
                            raisesToAdd,
                            node.raiseLevel + 1,
                            node.potSize + raiseValue,
                            node.effectiveSize - raiseValue,
                            raiseValue,
                            newPlayerTurn,
                            "fcr"
                        )
                    }
                } 

                if (building === true)
                {
                    node.postActionNodes[action] = n;
                    buildFromNode(n);
                }
                else 
                {
                    node.postActionNodes[action] = n;
                } 
            }
        }

        console.log("before building from root node, root actions : ", this.root.actions)

        buildFromNode(this.root);

        console.log("finished building tree, came on build from node function ", cameOnBuildFromNode, " times");

    }


}

export default Tree;
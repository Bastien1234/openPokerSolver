class TreeSubnode 
{
    hand: string[];
    actionMap: {[key: number]: number};
    bestScore: number;
    actions: number[];

    constructor(
        hand: string[],
        actions: number[]
    )
    {
        this.bestScore = Number.MIN_SAFE_INTEGER;
        this.hand = hand;
        this.actions = actions;

        let defaultValue = Math.floor(100 / actions.length);

        for (let act of actions)
        {
            this.actionMap[act] = defaultValue;
        }
    }
};

class TreeNode
{
    globalActionMap: {[key: number]: number};
    globalBestScore: number;
    range: string[][];
    localActionMap: {[key: string]: TreeSubnode};
    currentFacingBet: number;
    nodeType: string;
    postActionNodes: {[key: number]: TreeNode}
    actions: number[];
    raises: number[];
    raiseLevel: number;
    potSize: number;
    effectiveSize: number;
    playersTurn: string;



    constructor(
        range,
        actions,
        raises,
        raiseLevel,
        potSize: number,
        effectiveSize,
        currentFacingBet,
        playersTurn: string,
        nodeType
    )
    {
        this.range = range;
        this.raiseLevel = raiseLevel;
        this.potSize = potSize;
        this.effectiveSize = effectiveSize;
        this.currentFacingBet = currentFacingBet;
        this.playersTurn = playersTurn;
        this.actions = actions;
        this.raises = raises;
        this.nodeType = nodeType;

        // pointers to next node
        // Creating the global action map
        switch(nodeType)
        {
            case "fcr":
                this.actions = this.raises;
                let defaultValue: number = (100 / this.actions.length);
                for (let act of this.actions)
                {
                    this.globalActionMap[act] = defaultValue;
                };
                break;

            case "root":
                this.actions.push(-1);
                for (let act of this.actions)
                {
                    this.postActionNodes[act] = null;
                };
                break;

            case "xbb":
                this.actions.push(0);
                this.postActionNodes[0] = null;
                for (let act of this.actions)
                {
                    this.postActionNodes[act] = null;
                }
                break;

            case "fcr":
                this.actions.push(-2);
                this.actions.push(-3);
                this.postActionNodes[-2] = null;
                this.postActionNodes[-3] = null;
                for (let act of this.actions)
                {
                    this.postActionNodes[act] = null;
                };
                break;
            
            case "fc":
                this.actions.length = 0;
                this.actions.push(-2);
                this.actions.push(-3);
                this.postActionNodes[-2] = null;
                this.postActionNodes[-3] = null;
                break;
        }
    }
}

export {
    TreeNode,
    TreeSubnode
};
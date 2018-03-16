const initialState = {
    employees: {
        0: {
            id: "root",
            name: "root"
        }
    },
    loadingData: {
        0: {
            isLoading: false,
            isFullLoaded: true,
        }
    },
    positions: {}
};

export default (state = initialState, action) => {
    const headID = action.head;
    switch (action.type) {
        case 'GET_EMPLOYEES': {
            action.childIDs = action.childIDs.filter(         //if child is already in state - ignore this one
                (childID) => (!(childID in state.employees))
            );
            return {
                ...state,
                employees: {
                    ...state.employees,
                    [headID]: {
                        ...state.employees[headID],
                        childIDs: [
                            ...(state.employees[headID].childIDs || []),
                            ...action.childIDs
                        ]
                    },
                    ...action.employees,
                },
                loadingData: {
                    ...state.loadingData,
                    [headID]: action.loadingData
                }
            };
        }
        case 'OPEN_EMPLOYEES_NODE': {
            return {
                ...state,
                employees: {
                    ...state.employees,
                    [headID]: {
                        ...state.employees[headID],
                        isOpened: true
                    }
                }
            };
        }
        case 'CLOSE_EMPLOYEES_NODE': {
            let closedChildren = action.childIDs.reduce(//close all nested nodes
                (closedChildrenObj, item) => ({
                        ...closedChildrenObj,
                        [item]: {
                            ...state.employees[item],
                            isOpened: false
                        }
                    }
                ), {});
            return {
                ...state,
                employees: {
                    ...state.employees,
                    [headID]: {
                        ...state.employees[headID],
                        isOpened: false
                    },
                    ...closedChildren
                }
            };
        }
        case "START_LOADING": {
            return {
                ...state,
                loadingData: {
                    ...state.loadingData,
                    [headID]: {
                        ...state.loadingData[headID],
                        isLoading: true
                    }
                }
            }
        }
        case "GET_POSITIONS": {
            console.log(action.positions);
            return {
                ...state,
                positions: {
                    ...state.positions,
                    ...action.positions
                }
            }
        }
        default:
            return state;
    }
};
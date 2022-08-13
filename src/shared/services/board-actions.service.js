import { generateId } from "./utils.service";

const BoardActions = { // Functions for all the board actions
    get: (id = null) => {
        if(id) {
            return JSON.parse(localStorage.getItem(id));
        } else {
            let boards = [];
            Object.keys(localStorage).forEach(key => {
                if(key.startsWith('board-')) {
                    boards.push(JSON.parse(localStorage.getItem(key)));
                }
            })

            return boards;
        }
    },
    post: (data) => {
        data.id = generateId('board');
        data.createdAt = data.id.split('-')[1];
        localStorage.setItem(data.id, JSON.stringify(data));
        return data.id;
    },
    put: (id, data) => {
        data.lastUpdatedAt = Date.now();
        localStorage.setItem(id, JSON.stringify(data));
    }
}

export default BoardActions;

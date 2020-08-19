import { IStudents } from '../shared/students';

export const ADD_STUDENT = 'ADD_STUDENT';
export const EDIT_STUDENT = 'EDIT_STUDENT';
export const DELETE_STUDENT = 'DELETE_STUDENT';

export function addCoinReducer(state: IStudents[] = [], action) {
    switch (action.type) {
        case ADD_STUDENT:
            action.payload.Id = state.length + 1;
            return [...state, action.payload];

        case 'EDIT_STUDENT':
            let stu = state.find(t => t.Id === action.payload.Id);
            let index = state.indexOf(stu);
            state[index] = action.payload;

            return [...state];

        case 'DELETE_STUDENT':

            let stufilter = state.filter(t => t.Id === action.payload.Id);
            return [stufilter];

        default:
            return state;
    }
}
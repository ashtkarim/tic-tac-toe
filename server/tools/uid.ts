import { v4 } from 'uuid';

export default function getNewId(): String {
    return (v4());
}
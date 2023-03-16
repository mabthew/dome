import Session from "supertokens-node/recipe/session";

export class User {
    static async getUserId({req, res}: any) {
        return (await Session.getSession(req, res)).getUserId();
    }
}
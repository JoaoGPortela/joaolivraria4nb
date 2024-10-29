import { UserRepository } from "../repositories/userRepository";
import { hashPassword, comparePassword } from "../helpers/hashHelper";
import { createSession } from "../helpers/sessionHelper";

export class AuthService {
    private userRepo: UserRepository; 

    constructor() {
        this.userRepo = new UserRepository();
    }

    async signUp(username: string, emailAddress: string, userPassword: string) {
        const hashedPassword = hashPassword(userPassword);
        const newUser = await this.userRepo.addUser(username, emailAddress, hashedPassword);
        return newUser;
    }

    async signIn(emailAddress: string, userPassword: string) {
        const user = await this.userRepo.getUserByEmail(emailAddress);
        if (!user) throw new Error("Usuário não encontrado");

        const isPasswordCorrect = comparePassword(userPassword, user.passwordHash);
        if (!isPasswordCorrect) throw new Error("Senha incorreta");

        createSession(user.id);
        return user;
    }

    async listUsers() {
        try {
            return await this.userRepo.getAllUsers(); 
        } catch (err) {
            throw new Error('Erro ao listar usuários');
        }
    }
}

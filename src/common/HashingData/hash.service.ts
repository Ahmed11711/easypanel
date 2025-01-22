import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  private readonly defaultSaltRounds = 10; // Default salt rounds

  // Hashing text with dynamic salt rounds
  async hashText(plainText: string, saltRounds?: number): Promise<string> {
    const rounds = saltRounds || this.defaultSaltRounds;
    return await bcrypt.hash(plainText, rounds);
  }

  // Verifying hashed text
  async verifyText(plainText: string, hashedText: string): Promise<boolean> {
    return await bcrypt.compare(plainText, hashedText);
  }
}

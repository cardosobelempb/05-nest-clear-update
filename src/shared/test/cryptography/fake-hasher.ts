import { HashComparer } from "@/shared/application/cryptography/hash-comparer";
import { HashGenerator } from "@/shared/application/cryptography/hash-generator";

export class FakeHashed implements HashGenerator, HashComparer {

  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }

}

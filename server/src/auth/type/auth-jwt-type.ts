import { UserRole } from 'src/user/enum/user-enum';

export type AuthJwtTypePayload = {
  name: string;
  id: string;
  role: UserRole;
};

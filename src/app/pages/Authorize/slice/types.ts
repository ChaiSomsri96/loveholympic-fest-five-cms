/* --- STATE --- */
interface Profile {
  username: string;
  name: string;
  avatar?: string;
}

export interface AuthorizeState {
  profile: Profile;
}

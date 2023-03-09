enum GenderUser {
  male = "male",
  female = "female",
  unknown = "unknown",
}

enum RolesUser {
  normal = "normal",
  admin = "admin",
}

type DetailsUser = {
  role: RolesUser;
  is_verified: boolean;
  created_at: Date;
  profile_photo: string;
  sex: GenderUser;
  date_birth: Date;
};

type Contact = {
  primary_email: String;
  secondary_email: String;
  country: String;
  city: String;
  phone: String;
};

export type User = {
  id: string;
  name: string;
  surname: string;
  pass?: string;
  details: DetailsUser;
  contact: Contact;
};

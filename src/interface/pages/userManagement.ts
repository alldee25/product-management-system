export interface UserListItem {
  uuid: string;
  title: string;
  image?: ImageType;
  phone: string;
  email: string;
  isCreateForm: boolean;
  role: string;
}

export interface ImageType {
  url: string;
}

export interface url {
  url: string;
}
export interface FormFilterOnSearch {
  email?: string;
  group?: string;
  role?: string;
}

interface Params extends FormFilterOnSearch {
  page?: number;
  [key: string]: any;
}

export interface GetUserListApiProp {
  params?: Params;
  token?: string;
}

export interface FormUserItem {
  uuid: string;
  image: string;
  title: string;
  phone: string;
  email: string;
  password: string;
  isCreateForm: string;
  role: string;
  assessorType: string;
  sport: string;
  address: string;
  contactName: string;
  contactPhone: string;
  file: any
}
export interface FilterParamsModel {
  search?: string;
  sort?: string;
  page: string | number;
  length?: number;
  status?: string;
  user_type?: string | number;
  direction?: string;
  sortBy?: string
  limit?: number
}

export interface AdminModel {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  password: string;
  user_type: number;
  status: number;
  temp_token: string;
  is_account_verify: boolean;
  deleted_at: any;
  created_at: number;
  updated_at: number;
  __v: number;
  refresh_tokens: string;
  soft_delete: boolean;
  address?: string;
  reset_password_token?: string;
}

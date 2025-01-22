export interface INotification {
  id: number;
  user_id: number;
  text: string;
  type: string;
  seen: number;
  created_at: Date;
  updated_at: Date;
}

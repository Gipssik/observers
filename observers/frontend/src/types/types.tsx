export interface IUser{
	id: number;
	username: string;
	email: string;
	date_created: string;
	notifications: INotification[];
	profile_image: string;
	// TODO: Finish User schema.
}

export interface INotification{
	id: number;
	question_id: number;
	title: string;
	user_id: number;
}

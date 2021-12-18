export interface IUser{
	id: number;
	username: string;
	email: string;
	date_created: string;
	notifications: INotification[];
	profile_image: string;
	questions: IQuestion[];
	// TODO: Finish User schema.
}

export interface INotification{
	id: number;
	question_id: number;
	title: string;
	user_id: number;
}

export interface IToken{
	access_token: string;
	token_type: string;
}

export interface IQuestion{
	id: number
	title: string;
	content: string;
	author_id: number;
	date_created: string;
	views: number;
}

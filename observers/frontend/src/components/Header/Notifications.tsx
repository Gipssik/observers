import React, {FC, useEffect, useState} from 'react';
import {useTypedSelector} from "../../hooks/useTypesSelector";
import Notification from "./Notification";
import {IconProps} from "../../types/types";

const Notifications: FC<IconProps> = ({className}) => {
	const {notifications, loading} = useTypedSelector(state => state.notifications);
	const [visible, setVisible] = useState(false);

	return (
		<div>
			<div
				// @ts-ignore
				after={notifications?.length}
				className={"header-icon "
				+ (notifications && notifications.length > 0 ? "notifications-icon " : "")
				+ (className ? className : "")}
				onClick={() => setVisible(!visible)}
			>
				<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
					 viewBox="0 0 172 172"><path d="M86,16.125c-5.9419,0 -10.75,4.8081 -10.75,10.75c0,0.46192 0.10498,0.90283 0.16797,1.34375c-18.58154,4.74512 -32.41797,21.62598 -32.41797,41.65625v48.375c0,3.04443 -2.33057,5.375 -5.375,5.375h-5.375v10.75h38.63281c-0.60889,1.70068 -1.00781,3.48535 -1.00781,5.375c0,8.83935 7.28565,16.125 16.125,16.125c8.83935,0 16.125,-7.28565 16.125,-16.125c0,-1.88965 -0.39893,-3.67432 -1.00781,-5.375h38.63281v-10.75h-5.375c-3.04443,0 -5.375,-2.33057 -5.375,-5.375v-46.86328c0,-20.19824 -13.50049,-38.21289 -32.41797,-43.16797c0.06299,-0.44092 0.16797,-0.88183 0.16797,-1.34375c0,-5.9419 -4.8081,-10.75 -10.75,-10.75zM83.64844,37.625c0.77685,-0.06299 1.55371,0 2.35156,0c0.33594,0 0.67188,0 1.00781,0c17.55273,0.5249 31.24219,15.91504 31.24219,33.76172v46.86328c0,1.88965 0.39893,3.67432 1.00781,5.375h-66.51562c0.60889,-1.70068 1.00781,-3.48535 1.00781,-5.375v-48.375c0,-17.06982 13.14356,-31.03222 29.89844,-32.25zM86,134.375c3.02344,0 5.375,2.35156 5.375,5.375c0,3.02344 -2.35156,5.375 -5.375,5.375c-3.02344,0 -5.375,-2.35156 -5.375,-5.375c0,-3.02344 2.35156,-5.375 5.375,-5.375z"></path>
				</svg>
			</div>
			<div
				style={{visibility: visible ? 'visible' : 'hidden'}}
				className="notifications-container"
				onClick={() => setVisible(false)}
			>

			</div>
			<div style={{visibility: visible ? 'visible' : 'hidden'}} className="notifications">
				{
					notifications && notifications?.length > 0 ?
						<>
							{notifications?.map(notification =>
							<Notification key={notification.id} notification={notification} setVisible={setVisible}/>)}
						</>
						:
						<div className="w-full text-center">You don't have any notifications.</div>
				}
			</div>
		</div>
	);
};

export default Notifications;
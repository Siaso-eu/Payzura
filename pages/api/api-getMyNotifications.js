import {Moralis} from '../../JS/DB-cloudFunctions'
import middleware from '../../middleware/middleware'
import nextConnect from 'next-connect'
import {GetMyNotifications} from '../../JS/DB-cloudFunctions'
import {ParsePathGiveUserWallet} from "../../JS/BackendFunctions";
import { SetNotificationsAsRead } from '../../JS/DB-pushFunctions';

const apiRoute = nextConnect()
apiRoute.use(middleware)


apiRoute.get(async (req, res) => {     
    console.log(req.body)
 
    const UserWallet = ParsePathGiveUserWallet(req.url).toLowerCase();
    if(UserWallet == -1){res.end()}

    console.log("UserWallet: " + UserWallet);
    const notifications = await GetMyNotifications(UserWallet);

    // set read to notifications, use delay so strict mode does not interfere
    setTimeout(() => SetNotificationsAsRead(UserWallet), 1000)
    
    

    console.log("server, UserWallet: " + UserWallet);
    console.log("server: " + JSON.stringify(notifications));

    res.end(JSON.stringify(notifications, null, 3));
})

export const config = {
    api: {
      bodyParser: false
    }
} 
export default apiRoute


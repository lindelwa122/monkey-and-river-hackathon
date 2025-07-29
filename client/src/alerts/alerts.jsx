import { nanoid } from 'nanoid';
import { format } from 'date-fns';


import styles from './all-blogs.module.css';
import extractIntro from '../../utils/extract-info';
import { useAlertsData } from '../../utils/custom-hooks';

const Alert = () => {
  const { error, alerts, loading } = useAlertsData();

  let alertList;
  if (alerts) {
    alertList = alerts.map(alert => {
      return (
        <div
          key={nanoid()} 
          className={styles.blog} 
          to={alert.url}>
            <p className={styles.alertDate}>{format(alert.published_on, 'PPP')}</p>
            <h2 className={styles.alertTitle}>{alert.title}</h2>
            <p className={styles.alertDescr}>{extractIntro(alert.content)}</p>
        </div>
      )
    });
  }

}

export default Alert;
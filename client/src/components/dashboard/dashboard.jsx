import monitored_destination from "../../../../api/models/monitored_destination";

 <div>
    <Link>
        key={nanoid()} 
        className={styles.blog} 
        to={alerts.url}
        <p className={styles.alertDate}>{format(alert.published_on, 'PPP')}</p>
        <h2 className={styles.alertTitle}>{alert.title}</h2>
        <p className={styles.alertDescr}>{extractIntro(alert.content)}</p>
 
    </Link>

    <Link>
        key={nanoid()} 
        className={styles.blog} 
        to={monitored_destination.url}
        <p className={styles.alertDate}>{format(alert.published_on, 'PPP')}</p>
        <h2 className={styles.alertTitle}>{alert.title}</h2>
        <p className={styles.alertDescr}>{extractIntro(alert.content)}</p>
 
    </Link>
          
        </div>

        
   
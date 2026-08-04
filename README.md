# מיני-אפליקציה לניהול טיפולי שיאצו

אפליקציה קטנה למטפלת שיאצו, בנויה משלושה חלקים:

1. **שאלון מקדים למטופל/ת** (`/intake-form.html`) — נשלח למטופלת לפני הטיפול.
   כולל פרטים אישיים, סיבת פנייה, רקע רפואי, אורח חיים, שאלון בטיחות
   ("דגלים אדומים") והצהרת בריאות. שאלון שנשלח נשמר אוטומטית ופותח
   כרטיס מטופלת (שיוך לפי שם או טלפון).
2. **טופס טיפול ראשון** — למילוי המטפלת במפגש הראשון: תשאול מפורט,
   סקירת מערכות, בדיקות (לשון, דופק, בטן/גב), אבחנה סינית, תוכנית
   טיפול וסטטוס אישור.
3. **מעקב אישי לכל מטופלת** — רישום כל טיפול (דיווח מטופלת ומטפלת,
   פירוט, המלצות), סימון "ניתנה קבלה", הערות חופשיות וסיכום סדרה.

ממשק הניהול למטפלת: `/admin.html` (רשימת מטופלות, חיפוש, כרטיס אישי).

כל המידע נשמר מקומית בקובץ `data/db.json` (לא נכנס ל-git).

## Requirements

NodeJS 16+

## Installing dependencies

To install dependencies run `npm install`

## Running application

By default application is listening on 3000 port, but it can be changed to
different via environment variable `PORT`

To run application, execute `npm run start` or `node src/app.js`

Then open:

- Patient intake form: http://localhost:3000/intake-form.html
- Therapist admin: http://localhost:3000/admin.html

## הגנת סיסמה

כאשר מוגדר משתנה סביבה `ADMIN_PASSWORD`, ממשק הניהול (`/admin.html`)
וה-API של המטופלות דורשים התחברות בדף `/login.html`. השאלון למטופלות
נשאר פתוח תמיד. בהרצה מקומית ללא המשתנה — אין צורך בסיסמה.

הרצה מקומית עם סיסמה:

```
ADMIN_PASSWORD=הסיסמה-שלך npm start
```

## פריסה לאינטרנט (Render)

הפרויקט כולל `render.yaml` מוכן. שלבים:

1. נכנסים אל [render.com](https://render.com) ונרשמים (אפשר עם חשבון GitHub).
2. לוחצים **New → Blueprint** ובוחרים את המאגר הזה. Render יזהה את
   `render.yaml` לבד.
3. בשלב הגדרת משתני הסביבה, מזינים ערך ל-`ADMIN_PASSWORD` — זו הסיסמה
   שלך לכניסה לממשק הניהול. בחרי סיסמה ארוכה וייחודית.
4. מאשרים. אחרי כמה דקות תתקבל כתובת כמו
   `https://shiatsu-clinic.onrender.com`:
   - שאלון למטופלות: `https://…/intake-form.html` — את הקישור הזה שולחים בוואטסאפ.
   - ממשק ניהול: `https://…/admin.html` (מוגן בסיסמה).

> **חשוב:** ההגדרה כוללת דיסק קבוע (persistent disk) שבו נשמר
> `db.json`, כדי שהמידע לא יימחק בעדכוני שרת. דיסק קבוע דורש תוכנית
> בתשלום ב-Render (תוכנית Starter). אל תפרסי בתוכנית חינמית ללא דיסק —
> המידע יימחק בכל הפעלה מחדש. מומלץ גם לגבות מדי פעם: בממשק Render,
> `Shell → cat /data/db.json` ולשמור עותק.

> **Note:** health data is stored in a JSON file. Keep `ADMIN_PASSWORD`
> strong and private, and back up the data folder regularly.

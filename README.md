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

## פריסה לאינטרנט - בחינם

הנתונים נשמרים במסד נתונים חינמי (Neon) והאתר רץ בתוכנית החינמית של
Render, כך שאין שום עלות. שני שלבים:

### שלב א: מסד נתונים חינמי ב-Neon

1. נכנסים אל [neon.tech](https://neon.tech) ונרשמים (אפשר עם Google).
2. יוצרים פרויקט חדש (השם לא משנה, למשל `shiatsu`).
3. במסך הפרויקט לוחצים **Connect** ומעתיקים את כתובת החיבור —
   מחרוזת שמתחילה ב-`postgresql://…`. שומרים אותה בצד.

### שלב ב: האתר ב-Render

1. נכנסים אל [render.com](https://render.com) ונרשמים (אפשר עם חשבון GitHub).
2. לוחצים **New → Blueprint** ובוחרים את המאגר הזה. Render יזהה את
   `render.yaml` לבד.
3. בשלב משתני הסביבה ממלאים:
   - `ADMIN_PASSWORD` — הסיסמה שלך לממשק הניהול (ארוכה וייחודית).
   - `DATABASE_URL` — כתובת החיבור שהועתקה מ-Neon.
4. מאשרים. אחרי כמה דקות תתקבל כתובת כמו
   `https://shiatsu-clinic.onrender.com`:
   - שאלון למטופלות: `https://…/intake-form.html` — את זה שולחים בוואטסאפ.
   - ממשק ניהול: `https://…/admin.html` (מוגן בסיסמה).

> **טוב לדעת:** בתוכנית החינמית של Render השרת "נרדם" אחרי רבע שעה
> ללא שימוש, והכניסה הראשונה אחרי הפסקה לוקחת עד דקה — זה תקין,
> פשוט מחכים. הנתונים עצמם שמורים ב-Neon ולא נמחקים לעולם, גם
> בעדכוני שרת.

> **Note:** without `DATABASE_URL` the app stores data in a local JSON
> file (`data/db.json`) — fine for running on your own computer. Keep
> `ADMIN_PASSWORD` strong and private, and back up your data regularly
> (Neon dashboard → Tables, or copy `data/db.json`).

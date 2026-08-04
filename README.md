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

> **Note:** the app has no authentication and stores health data in a local
> JSON file — run it on your own computer or behind a protected network,
> and back up the `data/` folder regularly.

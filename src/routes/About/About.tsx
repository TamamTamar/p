import { FaArrowDown } from "react-icons/fa";

const About = () => {
  return (
    <>
      <div className="m-24 space-y-2">
        <div
          className="group flex flex-col gap-2 rounded-lg  bg-blue-950 dark:bg-gray-500 p-5 text-white"
          tabIndex={1}
        >
          <div className="flex cursor-pointer text-center items-center justify-between">

            <FaArrowDown className="h-6 w-3 transition-all duration-500 group-focus:-rotate-180" />
            <div className="text-xl font-bold text-center"> קצת עלינו </div>
          </div>
          <div className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000">
          <p className="text-center">.אנחנו אתר המתמחה בספק פתרונות כרטיסיות לעסקים, מאפשרים לעסקים ומשתמשים לנהל ביעילות את רשימת הכרטיסיות שלהם ולשדרג את חווית המשתמש באמצעות כלי ניהול מתקדמים
          </p>
          </div>
        </div>

        <div
        className="group flex flex-col gap-2 rounded-lg  bg-blue-950 dark:bg-gray-500 p-5 text-white"
        tabIndex={2}
      >
        <div className="flex cursor-pointer text-center items-center justify-between">

          <FaArrowDown className="h-6 w-3 transition-all duration-500 group-focus:-rotate-180" />
          <div className="text-xl font-bold text-center"> ?איך זה עובד </div>
        </div>
        <div className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000">
        <p className="text-center">הפלטפורמה שלנו פשוטה לשימוש, לאחר הרשמה והתחברות למערכת בעזרת הזנת פרטים בטופס האינטואיטיבי המשתמש רשאי להוסיף כרטיסיית עסק חדשה ולעדכן פרטים כרטיסיות קיימות דרך ממשק נוח וידידותי המשתמש יכול לסמן כרטיסיות אהובות ולשנות את פרטי המשתמש שלו בכל עת</p>
        </div>
      </div>
        <div
          className="group flex flex-col gap-2 rounded-lg bg-blue-950 dark:bg-gray-500 p-5 text-white"
          tabIndex={3}
        >
          <div className="flex cursor-pointer items-center justify-between">
            <FaArrowDown className="h-6 w-3 transition-all duration-500 group-focus:-rotate-180" />
            <div className="text-xl font-bold text-center"> ממשק ואינטראקציה </div>
          </div>
          <div
            className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000"
          >
            <p className="text-center"> .הממשק שלנו מיועד להיות ברור ונוח לשימוש, מאפשר למשתמשים לנווט בין הפונקציות בצורה יעילה. ניתן לבצע פעולות בכמה לחיצות עכבר בלבד ולקבל מענה מהיר לכל בקשה
            </p>
          </div>
        </div>
      </div>


    </>
  );
};

export default About;

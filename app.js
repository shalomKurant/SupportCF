// מקבל את הנתיב הבסיסי עבור פתיחה של קבצים
const loc = window.location.pathname;
const baseDir = initPathData();
let currentDirectory = baseDir;

// סתם משתנים קבועים שחוזרים על עצמם
const OPPENED_FILE_CLASS = "opened-file";
const BASE_TAB_LINKS_CLASS = "tab-links";

// כאן מכניסים את שמות הקבצים - למשל התיקייה היא דף הבית ובתוכה יושבים במערך שמות הקבצים
const filesData = {
  HomePage: {displayName: "דף הבית", files: ['page1', 'page2', 'page3']},
  About: {displayName: "אודות", files: []},
  Galey: {displayName: "גלריה", files: []},
  Recomendation: {displayName: "המלצות", files: []},
  Contact: {displayName: "צור קשר", files: []},
  Extra: {displayName: "תוספות", files: []},
}

// אתחול של התיקייה בה יושבים הקבצים - עבור כל פתיחת טאב
function initPathData() {
  return loc.substring(0, loc.lastIndexOf('/')) + '/data/';
}

// יצירה של טאבים בשורת הבסיס
initBaseTabs(); 

function initBaseTabs() {
  Object.keys(filesData).forEach(tabName => {
    var tabElement = document.createElement("li");
    tabElement.setAttribute("class", BASE_TAB_LINKS_CLASS);
    tabElement.setAttribute("onclick", `openTab(event, '${tabName}')`);
    tabElement.setAttribute("id", tabName);

    const innerElement = document.createElement("p");
    tabElement.appendChild(innerElement);

    const innerText = document.createTextNode(filesData[tabName].displayName);
    innerElement.appendChild(innerText);

    var baseNavList = document.getElementById("nav-list");
    if (baseNavList) {
      baseNavList.appendChild(tabElement);
    }
  })
}

// מבצע כל הפעולות הרלוונטיות לפתיחה של טאב - כולל סגירה של אחרים
function openTab(evt, tabName) {
  markHighlightTab(evt, true);
  currentDirectory = initPathData();
  removeOpenedFile();
  removeFileList();
  currentDirectory += tabName + '/';
  addFilesMenu(tabName)
}

// פתיחה של קובץ ספציפי
function openFile(event, fileName) {
  let fullPath = currentDirectory;
  removeOpenedFile();
  fullPath += fileName + '.pdf';

  var fileElement = document.createElement("embed");
  fileElement.setAttribute("id", OPPENED_FILE_CLASS);
  fileElement.setAttribute("src", fullPath);

  var div_element = document.getElementById("base-page-content");
  div_element.appendChild(fileElement);
}

// הסרה של קובץ פתוח אם קיים
function removeOpenedFile() {
  const openedFile = document.getElementById(OPPENED_FILE_CLASS);
  if (openedFile) {
    openedFile.remove();
  }
}

// פתיחה של תפריט קבצים רלוונטי לטאב 
function addFilesMenu(tabName) {
  filesData[tabName].files.forEach(fileName => {
    const fileNameElement = document.createElement("div");
    fileNameElement.setAttribute("onclick", `openFile(event, '${fileName}')`);
    fileNameElement.setAttribute("class", "file-name");

    const text = document.createTextNode(fileName);
    fileNameElement.appendChild(text);

    const baseFiles = document.getElementById("tab-files-list");
    baseFiles.appendChild(fileNameElement);
  })
}

// הסרה של רשימת קבצים מטאב קודם
function removeFileList() {
  const filesName = document.getElementsByClassName("file-name");
  const lengthList = filesName.length;
  if (lengthList > 0) {
    for (var i = lengthList -1; i >= 0; i--) {
      filesName[i].remove();
    }
  }
}

// סימון כותרת הטאב הנבחר בצבע שונה
function markHighlightTab(evt, shouldMarkTab) {
  var i, tablinks;
  tablinks = document.getElementsByClassName(BASE_TAB_LINKS_CLASS);
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  if (shouldMarkTab) {
    evt.currentTarget.className += " active";
  }
}

// לחיצה על סתם מקום באזור המסמך, תנקה את כל הבחירות
function clearTabSelection(evt) {
  markHighlightTab(evt, false);
  removeOpenedFile();
  removeFileList();
}
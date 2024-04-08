## Dashboard Admin /Doctors

For now Admin fills in all the information table all doctors all patient. At the moment, the administrator fills out the entire information table about all doctors and patients.
We connect Google calendar (
adnim fills in all doctors for their categories all doctors can be in all categories calendar takes into account doctors' days off, vacations, lanch time from 12-1pm . office hour from 6 am to 6 pm weekdays saturday for 9am to 4 pm , sunday day off. all patients who have an appointment, time and date according to the calendar)
The administrator controls twilio calls only after the information is reviewed personally by the administrator, they are added to the doctor’s calendar with a new appointment. you can make an add button.
the calendar should read all the information and the twilio should read the information from the calendar

on page can login only doctors who have a email in dashbord what add admin and we have to authorization password 2 times like email password and comfirm password.
ADMIN :
first name
last name
email
password

The admin has full control over the dashboard.
doctors have 4 category :
1.Genetal
2.Children
3.Cosmetic
4.Oral Surgery.
Doctors can be in couple category.
DOCTORS :
first name
last name
email
phone
password
Calendar (with doctors' days off, vacations, days off, vacations, lanch time from 12-1pm . office hour from 6 am to 6 pm weekdays saturday for 9am to 4 pm , sunday day off. schedule patient time/day) probably goole API ( easy contol that)
ADMIN SIDE :
BTN DOCTORS :
Here table with calendar:
FIRTS NAME,
LAST NAME,
phone number
NOT AVAILABLE DATA
AVAILABLE DATA/TIME
APPOITMENT schedule by calendar
patient full name ( mean full name patient time /day in calenar, what for patient coming ( for example: change crown, cleaning , x-ray, veneers) )
BTN PATIENT :
HERE table:
FIRTS NAME
LAST NAME
AGE
ADDRESS
PHONE NUMBER
APPOITMENT DATE
WHICH DOCTOR APPOITMENT
Dental insurance yes/no
name insurance if yes and number
Last x ray date
BTN AI CALL :
HERE ADMIN CAN SEE ALL UPDATE FROM TWILIO AND REAL INFO .

## TWILIO

# Twilio's side, it must read all the information from the table of free doctors when a new patient makes an appointment if the doctor has free time of 45 minutes or more,

    also finds urgent patients who are already calling to cancel an appointment, change the date or make an appointment again, must also read information about the last x-ray if it was done more than 5 months ago, persistently tell the patient to make an appointment for an x-ray too. will offer the patient a choice of 2-3 dates if the patient refuses to look for another date after the proposed date 2-3 dates

CALL THIS 3 OPTIONS :
1.CURRENT patient
find patient in dashboar and check what
find a patient in the dashboard by name, what he was registered for last time,( example: you are registered for veneers on January 21, 2024. )ask what the patient wants now 3 options to reschedule the appointment to another day or cancel or schedule new appointment (
all current patients must be notified if their last X-ray is 5-6 months away, they should make an appointment for an X-ray before any procedure)

     If you reschedule the date, the dashboard of the doctor for whom he is registered is also the next 3-4 dates are selected for the patient to select by voice.

2.NEW patient
full name,
first name, last name, residential address, telephone number, insurance if any, last visit to the dentist,
questions about allergies:
1.Medication Allergies
anesthetics or antibiotics 2. Latex Allergy
3.Allergies to Metals
4.Contact Allergies soaps or disinfectants
5.Food Allergies
6.Allergies to Dental Materials
7.General Health Allergies

questions whether a person smokes or not, if yes, for how long.
This is a new patient, we need to tell him that he is milking, first of all, sign up for an x-ray. After filling out all the information and selecting the nearest available doctor in the dashboard for registering the patient, we offer him a choice of 2-3 dates.

at the end, accordingly, announce the information, for example, congratulations on your next appointment with Dr. Maria for x-rai and cleaning is scheduled for January 30, 2024 at 12:15 am

# AFTER CALL TWILIO

Here we get that after the call, the information goes to the administrator, who looks if everything is ok, presses the button and the information goes to the doctor’s calendar with whom the patient has signed up.

3.emergency -> for now by default make my swich my personal phone number

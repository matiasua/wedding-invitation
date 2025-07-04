// EventCard.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  CalendarPlus,
  X,
  Chrome,
  Apple,
  Calendar as CalendarIcon
} from 'lucide-react';
import { formatEventDate } from '@/lib/formatEventDate';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-[90%] max-w-sm"
          >
            <div className="bg-white transform -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 shadow-2xl border border-gray-100">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CalendarButton = ({ icon: Icon, label, onClick, className = "" }) => (
  <motion.button
    onClick={onClick}
    className={`flex items-center space-x-3 w-full p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors ${className}`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Icon className="w-5 h-5" />
    <span className="text-gray-700 font-medium">{label}</span>
  </motion.button>
);

/**
 * SingleEventCard component displays an event card with options to add the event
 * to various calendars (Google Calendar, Apple Calendar, and Outlook Calendar).
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.eventData - Object containing event data.
 * @param {string} props.eventData.date - The date of the event (expected format: YYYY-MM-DD).
 * @param {string} props.eventData.startTime - The start time of the event (expected format: HH:mm).
 * @param {string} props.eventData.endTime - The end time of the event (expected format: HH:mm).
 * @param {string} props.eventData.title - The title of the event.
 * @param {string} props.eventData.description - A description of the event.
 * @param {string} props.eventData.location - The location where the event takes place.
 * @param {string} props.eventData.timeZone - The time zone of the event.
 *
 * @example
 * const eventData = {
 *   date: '2023-10-15',
 *   startTime: '14:00',
 *   endTime: '16:00',
 *   title: 'Wedding Ceremony - Reception',
 *   description: 'Join us to celebrate the wedding ceremony and reception.',
 *   location: 'Sunset Gardens',
 *   timeZone: 'Asia/Jakarta'
 * };
 *
 * <SingleEventCard eventData={eventData} />
 *
 * @returns {JSX.Element} A JSX element representing the event card.
 */
const SingleEventCard = ({ eventData }) => {
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const googleCalendarLink = () => {
    const pad = (n) => String(n).padStart(2, '0');

    const formatDateTime = (dateStr, timeStr) => {
      const [year, month, day] = dateStr.split('-');
      const [hour, minute] = timeStr.split(':');
      return `${year}${pad(month)}${pad(day)}T${pad(hour)}${pad(minute)}00`;
    };

    const startDate = eventData.date; // Ej: 20251003T160000
    let endDate = eventData.date;    // Ej: 20251003T183000

    const [startHour] = eventData.startTime.split(':').map(Number);
    const [endHour] = eventData.endTime.split(':').map(Number);

    // si termina pasada medianoche (ej: 03:00), sumar un día
    if (endHour < startHour) {
      const d = new Date(`${eventData.date}T00:00:00`);
      d.setDate(d.getDate() + 1);
      endDate = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    }

    const start = formatDateTime(startDate, eventData.startTime);
    const end = formatDateTime(endDate, eventData.endTime);

    const title = encodeURIComponent("Ceremonia de Matrimonio Karen & Matias");
    const description = encodeURIComponent(
      eventData.description || "Acompáñanos a celebrar este día tan especial 💍"
    );
    const location = encodeURIComponent(eventData.location || "Parcela 68F, Reina Norte, Colina");
    const timeZone = encodeURIComponent(eventData.timeZone || "America/Santiago");

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${description}&location=${location}&ctz=${timeZone}`;
  };

  const generateICSContent = () => {
    const startDate = new Date(`${eventData.date}T${eventData.startTime}:00`);
    const endDate = new Date(`${eventData.date}T${eventData.endTime}:00`);

    const formatICSDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${window.location.href}
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:${eventData.title}
DESCRIPTION:${eventData.description}
LOCATION:${eventData.location}
END:VEVENT
END:VCALENDAR`;
  };

  const downloadICSFile = () => {
    const icsContent = generateICSContent();
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${eventData.title.toLowerCase().replace(/ /g, '-')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative">
      <motion.div
        className="bg-white rounded-2x1 p-6 shadow-sm border border-gray-100 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">{eventData.title.split(' - ')[0]}</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-rose-500 hover:text-rose-600 transition-colors"
            onClick={() => setShowCalendarModal(true)}
          >
            <CalendarPlus className="w-5 h-5" />
          </motion.button>
        </div>
        <div className="space-y-3 text-gray-600">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-rose-500" />
            <span>{formatEventDate(eventData.date)}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-rose-500" />
            <span>{eventData.startTime} - {eventData.endTime} AM</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-rose-500" />
            <span>{eventData.location}</span>
          </div>
        </div>
      </motion.div>

      <Modal
        isOpen={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
      >
        <div className="space-y-6 ">
          <div className="flex justify-between  items-center">
            <h3 className="text-xl font-semibold text-gray-800">Añadir al Calendario</h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowCalendarModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="space-y-3">
            <CalendarButton
              icon={(props) => <Chrome {...props} className="w-5 h-5 text-rose-500" />}
              label="Google Calendar"
              onClick={() => window.open(googleCalendarLink(), '_blank')}
            />

            <CalendarButton
              icon={(props) => <Apple {...props} className="w-5 h-5 text-gray-900" />}
              label="Apple Calendar"
              onClick={downloadICSFile}
            />

            <CalendarButton
              icon={(props) => <CalendarIcon {...props} className="w-5 h-5 text-blue-600" />}
              label="Outlook Calendar"
              onClick={downloadICSFile}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Main EventCards component that handles multiple events
const EventCards = ({ events }) => {
  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <SingleEventCard key={index} eventData={event} />
      ))}
    </div>
  );
};

export default EventCards;

import React, { useState, useMemo } from 'react';
import { SchoolEvent } from '../../types';

export const eventsData: SchoolEvent[] = [
  {
    id: 1,
    title: 'Annual Sports Day',
    date: '2024-03-15',
    description: 'A day of thrilling athletic competitions, teamwork, and sportsmanship.',
    detailedDescription: 'Join us to cheer on our young athletes in a variety of track and field events. The day will conclude with a prize distribution ceremony to honor the winners and participants. Refreshments will be available for all attendees.',
    mediaUrl: 'https://picsum.photos/800/450?image=1062',
    mediaType: 'image',
  },
  {
    id: 2,
    title: 'Science Fair Exhibition',
    date: '2024-04-22',
    description: 'Explore the innovative and creative projects from our budding scientists.',
    detailedDescription: 'Our annual Science Fair is a showcase of curiosity and discovery. Students from grades 3 to 7 will present their projects on various topics ranging from environmental science to robotics. Parents and guests are welcome to interact with the students and learn about their findings.',
    mediaUrl: 'https://picsum.photos/800/450?image=24',
    mediaType: 'image',
  },
  {
    id: 3,
    title: 'Cultural Fest 2024',
    date: '2024-05-10',
    description: 'A vibrant celebration of diversity, art, and culture with performances from students.',
    detailedDescription: 'Experience a mesmerizing evening of music, dance, and drama as our students showcase their talents. The Cultural Fest is a celebration of our diverse heritage and a testament to the creativity of our students. The event will be held in the school auditorium.',
    mediaUrl: 'https://picsum.photos/800/450?image=1043',
    mediaType: 'image',
  },
   {
    id: 4,
    title: 'Parent-Teacher Conference',
    date: '2025-06-05',
    description: 'An opportunity for parents and teachers to discuss student progress.',
    detailedDescription: 'This conference is a crucial touchpoint for parents and teachers to collaborate for the student\'s academic and personal growth. We encourage all parents to attend their scheduled slots to have a productive discussion about their child\'s performance and development.',
    mediaUrl: 'https://picsum.photos/800/450?image=1025',
    mediaType: 'image',
  },
];

const EventModal: React.FC<{ event: SchoolEvent; onClose: () => void }> = ({ event, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="relative">
          {event.mediaType === 'image' && <img src={event.mediaUrl} alt={event.title} className="w-full h-64 object-cover" />}
          {event.mediaType === 'video' && <video src={event.mediaUrl} controls className="w-full h-64 bg-black" />}
          <button onClick={onClose} className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 text-2xl leading-none">&times;</button>
        </div>
        <div className="p-6">
          <p className="text-sm font-semibold text-school-gold">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <h2 className="mt-2 text-2xl font-bold text-school-blue">{event.title}</h2>
          <p className="mt-4 text-gray-700">{event.detailedDescription}</p>
        </div>
      </div>
    </div>
  );
};


const EventCard: React.FC<{ event: SchoolEvent, onLearnMore: () => void }> = ({ event, onLearnMore }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
      <img src={event.mediaType === 'image' ? event.mediaUrl : 'https://picsum.photos/400/250?image=1074'} alt={event.title} className="w-full h-48 object-cover"/>
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-sm font-semibold text-school-gold">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <h3 className="mt-2 text-xl font-bold text-school-blue">{event.title}</h3>
        <p className="mt-2 text-gray-600 flex-grow">{event.description}</p>
         <button onClick={onLearnMore} className="mt-4 bg-school-blue text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors self-start">
          Learn More
        </button>
      </div>
    </div>
  );
};

const Events: React.FC<{ eventsData: SchoolEvent[] }> = ({ eventsData }) => {
  const [selectedEvent, setSelectedEvent] = useState<SchoolEvent | null>(null);

  const { upcomingEvents, pastEvents } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for comparison
    const upcoming = eventsData
      .filter(event => new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const past = eventsData
      .filter(event => new Date(event.date) < today)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return { upcomingEvents: upcoming, pastEvents: past };
  }, [eventsData]);

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section>
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-school-blue sm:text-4xl">
                Upcoming Events
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Join our vibrant school community in these exciting upcoming events.
              </p>
            </div>
            {upcomingEvents.length > 0 ? (
                <div className="mt-12 grid gap-8 lg:grid-cols-2">
                {upcomingEvents.map(event => (
                    <EventCard key={event.id} event={event} onLearnMore={() => setSelectedEvent(event)} />
                ))}
                </div>
            ) : (
                <p className="mt-12 text-center text-gray-500">No upcoming events scheduled at the moment. Please check back soon!</p>
            )}
        </section>

        <section className="mt-20">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-school-blue sm:text-4xl">
                Past Events
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                A glimpse into our memorable past events.
              </p>
            </div>
            {pastEvents.length > 0 ? (
                <div className="mt-12 grid gap-8 lg:grid-cols-2">
                {pastEvents.map(event => (
                    <EventCard key={event.id} event={event} onLearnMore={() => setSelectedEvent(event)} />
                ))}
                </div>
            ) : (
                <p className="mt-12 text-center text-gray-500">No past events to show.</p>
            )}
        </section>
      </div>
      {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </div>
  );
};

export default Events;

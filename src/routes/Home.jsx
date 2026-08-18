import { Link } from 'react-router-dom';
import Header  from '../components/Header'
import Hero from '../components/Hero';

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <section className="flex w-full flex-1 items-center flex-col md:flex-row">
                <div className="w-full md:w-2/3"><Hero /></div>
                <div className="hidden md:block md:w-1/3"></div>
            </section>
        </div>
    );
}
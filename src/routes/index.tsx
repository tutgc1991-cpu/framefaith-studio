import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, ArrowUpRight, BadgeCheck, MapPin, Sprout, TrendingUp, Building2, Globe2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SprintCard } from '@/components/localsprint/sprint-card';
import { useDemo } from '@/components/localsprint/app-shell';
import { sprints } from '@/lib/localsprint';
import community from '@/assets/localsprint-community.png.asset.json';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'LocalSprint Fellowships | Skills into Local Experience' },
    { name: 'description', content: 'Turn bootcamp skills into verified local experience with 2-to-4-week mentored micro-internships.' },
    { property: 'og:title', content: 'LocalSprint Fellowships | Verified Local Experience' },
    { property: 'og:description', content: 'Real local projects, trusted mentors, and supervisor-signed experience records.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

function Index() {
  const { state } = useDemo();
  return <main className="page"><div className="welcome"><div><h2>{state.role === 'learner' ? 'A little local experience. A big next step.' : 'Local talent. Real-world possibilities.'}</h2><p>{state.role === 'learner' ? 'Welcome back, Amina. Let’s build your next opportunity.' : 'Welcome, SavannaPay Tech / CivicHub. Help the next generation take their first step.'}</p></div><span className="location"><MapPin size={13}/>Nairobi, Kenya<span className="mx-1">·</span>Built for local impact</span></div><section className="overview-hero"><img src={community.url} alt="Young East African developers collaborating on a laptop at a Nairobi technology hub"/><div className="hero-content"><span className="hero-label"><Sprout size={13} className="text-success"/>REAL PROJECTS. REAL EXPERIENCE.</span><h1>Turn Bootcamp Skills into <span>Verified Local Experience.</span></h1><p>2-to-4-week mentored micro-internships with local businesses and NGOs—ending with a verified supervisor sign-off employers actually trust.</p><div className="hero-actions"><Button variant="hero" asChild><Link to="/sprints">Explore Open Sprints<ArrowRight/></Link></Button><Button variant="heroOutline" asChild><Link to="/record"><BadgeCheck/>View Sample Verified Record</Link></Button></div></div><span className="hero-photo-caption"><MapPin size={11}/>Building together. Moving forward.</span></section><section className="impact-strip" aria-label="Fellowship impact"><div className="impact-stat"><div className="stat-icon"><CheckCircle2 size={22}/></div><div><strong>142<span className="text-success">+</span></strong><p>Sprints Completed</p></div></div><div className="impact-stat"><div className="stat-icon"><TrendingUp size={22}/></div><div><strong>89<span className="text-success">%</span></strong><p>Hiring Partner Callback Rate</p></div></div><div className="impact-stat"><div className="stat-icon"><Building2 size={22}/></div><div><strong>34</strong><p>Partner Organizations (SDG 17)</p></div></div><div className="impact-note"><Globe2 size={15} className="mb-1 text-success"/>Local connections.<br/>Lasting global impact.</div></section><div className="section-heading"><div><h2>A small sprint. A meaningful start.</h2><p>Handpicked opportunities with verified partners and dedicated mentors.</p></div><Button variant="link" asChild className="text-xs"><Link to="/sprints">View all sprints<ArrowUpRight/></Link></Button></div><div className="sprint-grid">{sprints.slice(0,3).map(s=><SprintCard key={s.id} sprint={s}/>)}</div><footer className="bottom-band"><div className="flex items-center gap-3"><ShieldIcon/><span><strong>Not just another project on your CV.</strong><br/>Real deliverables. A named mentor. Experience employers can trust.</span></div><div className="flex items-center gap-3"><span className="eyebrow">ALIGNED WITH</span><span className="sdg-tag">SDG 8 · Decent work</span><span className="sdg-tag">SDG 10 · Inclusion</span><span className="sdg-tag">SDG 17 · Partnerships</span></div></footer></main>;
}
function ShieldIcon() { return <BadgeCheck size={28} className="text-success"/>; }

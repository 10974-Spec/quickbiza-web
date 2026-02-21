import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageCircle, MapPin, Phone, ArrowLeft } from "lucide-react";

const services = [
  "Inventory management",
  "POS system",
  "Analytics & reports",
  "Team collaboration",
  "API integration",
  "Other",
];

const Contact = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>(["Inventory management", "POS system"]);

  const toggleService = (service: string) => {
    setSelected((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  return (
    <div className="min-h-screen bg-card">
      {/* Back button */}
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="text-zinc-400 hover:text-white hover:bg-zinc-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>

      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
            {/* Left - Contact Info */}
            <div className="bg-zinc-900 p-10 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-white mb-8">SokoFlow</h3>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <MessageCircle className="w-5 h-5 text-orange-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white mb-1">Chat to us</h4>
                      <p className="text-sm text-zinc-400 mb-1">Our friendly team is here to help.</p>
                      <p className="text-sm font-medium text-white">hi@sokoflow.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-orange-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white mb-1">Visit us</h4>
                      <p className="text-sm text-zinc-400 mb-1">Come say hello at our office HQ.</p>
                      <p className="text-sm font-medium text-white">
                        100 Smith Street<br />
                        Nairobi, Kenya
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-orange-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white mb-1">Call us</h4>
                      <p className="text-sm text-zinc-400 mb-1">Mon-Fri from 8am to 5pm.</p>
                      <p className="text-sm font-medium text-white">+254 700 000 000</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-10">
                {["facebook", "twitter", "linkedin", "youtube"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-orange-500/20 transition-colors"
                  >
                    <span className="text-xs font-bold text-zinc-400 uppercase">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right - Form (orange accent) */}
            <div className="bg-orange-500 p-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 leading-tight mb-3">
                Got ideas? We've got<br />the skills. Let's team up.
              </h2>
              <p className="text-sm text-zinc-950/70 mb-8">
                Tell us more about yourself and what you've got in mind.
              </p>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="text-xs font-medium text-zinc-950/70 mb-1 block">Your name</label>
                  <Input
                    placeholder="Your name"
                    className="bg-transparent border-0 border-b border-zinc-950/30 rounded-none px-0 focus-visible:ring-0 focus-visible:border-zinc-950 placeholder:text-zinc-950/40 text-zinc-950"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-zinc-950/70 mb-1 block">Email</label>
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    className="bg-transparent border-0 border-b border-zinc-950/30 rounded-none px-0 focus-visible:ring-0 focus-visible:border-zinc-950 placeholder:text-zinc-950/40 text-zinc-950"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-zinc-950/70 mb-1 block">Tell us about the project</label>
                  <Textarea
                    placeholder="Tell us a little about the project..."
                    className="bg-transparent border-0 border-b border-zinc-950/30 rounded-none px-0 focus-visible:ring-0 focus-visible:border-zinc-950 placeholder:text-zinc-950/40 text-zinc-950 min-h-[60px] resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-zinc-950/70 mb-3 block">How can we help?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {services.map((service) => (
                      <label key={service} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={selected.includes(service)}
                          onCheckedChange={() => toggleService(service)}
                          className="border-zinc-950/40 data-[state=checked]:bg-zinc-950 data-[state=checked]:border-zinc-950"
                        />
                        <span className="text-sm text-zinc-950">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button className="w-full rounded-full h-12 bg-zinc-950 text-white hover:bg-zinc-800 font-semibold text-base mt-4">
                  Let's get started!
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

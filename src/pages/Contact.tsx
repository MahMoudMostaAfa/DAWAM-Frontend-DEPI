
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4 text-dawam-dark-purple dark:text-white">
            Contact Us
          </h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Have a question or need assistance? Reach out to our team and we'll get back to you as soon as possible.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col items-center">
              <div className="w-14 h-14 bg-dawam-purple/10 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-dawam-purple" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-dawam-dark-purple dark:text-white">Phone</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                +1 (123) 456-7890
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-center text-sm mt-1">
                Mon-Fri, 9am-5pm EST
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col items-center">
              <div className="w-14 h-14 bg-dawam-purple/10 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-dawam-purple" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-dawam-dark-purple dark:text-white">Email</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                info@dawam.com
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-center text-sm mt-1">
                We'll respond within 24 hours
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col items-center">
              <div className="w-14 h-14 bg-dawam-purple/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-dawam-purple" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-dawam-dark-purple dark:text-white">Office</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                123 Career Street
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-center text-sm mt-1">
                Employment City, EC 12345
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-dawam-dark-purple dark:text-white">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please provide details about your inquiry..."
                    required
                    className="w-full min-h-[150px]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-dawam-purple hover:bg-secondary-purple text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
            
            <div className="relative h-[400px] lg:h-auto rounded-xl overflow-hidden shadow-lg">
              {/* Embed a map here. For now, using a placeholder background */}
              <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                <p className="text-gray-600 dark:text-gray-400">Map Placeholder</p>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-dawam-purple text-white p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Interested in working at DAWAM? We're always looking for talented individuals to join our growing team.
            </p>
            <Button className="bg-white text-dawam-purple hover:bg-gray-100">
              View Careers
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;

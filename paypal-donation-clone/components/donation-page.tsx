"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, X } from "lucide-react"

const generateDonors = () => {
  const names = [
    "Elijah Jones",
    "Emily Quigley",
    "Anonymous",
    "Athena Naranjo",
    "Anonymous",
    "Jose Ledesma",
    "Mateusz Żychoniuk",
    "Anonymous",
    "Marlon Bosbach",
    "Orges Berisha",
    "Anonymous",
    "Anonymous",
    "Özge Atilmis",
    "carlos meza",
    "Anonymous",
    "Anirudra Basnet",
    "Anonymous",
    "Nilgun Karacavus",
    "Anonymous",
    "Anonymous",
    "Jacqueline Mileski",
    "Kayla Williams",
    "Michael Chen",
    "Sarah Johnson",
    "David Martinez",
    "Lisa Anderson",
    "James Wilson",
    "Maria Garcia",
    "Robert Taylor",
    "Jennifer Brown",
    "William Davis",
    "Patricia Miller",
    "Richard Moore",
    "Linda Jackson",
    "Thomas White",
    "Barbara Harris",
    "Christopher Martin",
    "Nancy Thompson",
    "Daniel Garcia",
    "Karen Martinez",
    "Matthew Robinson",
    "Betty Clark",
    "Anthony Rodriguez",
    "Sandra Lewis",
    "Mark Lee",
    "Ashley Walker",
    "Donald Hall",
    "Kimberly Allen",
    "Paul Young",
    "Emily Hernandez",
    "Steven King",
    "Michelle Wright",
    "Andrew Lopez",
    "Carol Hill",
    "Joshua Scott",
    "Amanda Green",
    "Kevin Adams",
    "Melissa Baker",
    "Brian Nelson",
    "Deborah Carter",
    "George Mitchell",
    "Rebecca Perez",
    "Edward Roberts",
    "Laura Turner",
    "Jason Phillips",
    "Stephanie Campbell",
    "Ryan Parker",
    "Cynthia Evans",
    "Jacob Edwards",
    "Kathleen Collins",
    "Gary Stewart",
    "Amy Sanchez",
    "Nicholas Morris",
    "Angela Rogers",
    "Eric Reed",
    "Shirley Cook",
    "Jonathan Morgan",
    "Anna Bell",
    "Justin Murphy",
    "Brenda Bailey",
    "Brandon Rivera",
    "Pamela Cooper",
    "Raymond Richardson",
    "Nicole Cox",
    "Samuel Howard",
    "Katherine Ward",
    "Gregory Torres",
    "Christine Peterson",
    "Alexander Gray",
    "Samantha Ramirez",
    "Patrick James",
    "Janet Watson",
    "Frank Brooks",
    "Catherine Kelly",
    "Benjamin Sanders",
    "Frances Price",
    "Jack Bennett",
    "Ann Wood",
    "Dennis Barnes",
    "Joyce Ross",
    "Jerry Henderson",
    "Diane Coleman",
    "Tyler Jenkins",
    "Alice Perry",
    "Aaron Powell",
    "Julie Long",
    "Jose Patterson",
    "Heather Hughes",
    "Adam Flores",
    "Teresa Washington",
    "Henry Butler",
    "Doris Simmons",
    "Douglas Foster",
    "Gloria Gonzales",
    "Peter Bryant",
    "Evelyn Alexander",
    "Harold Russell",
    "Jean Griffin",
    "Kyle Hayes",
    "Cheryl Myers",
    "Carl Ford",
    "Mildred Hamilton",
    "Keith Graham",
    "Marilyn Sullivan",
    "Jeremy Wallace",
    "Beverly Woods",
  ]

  const colors = [
    "bg-green-600",
    "bg-blue-600",
    "bg-purple-600",
    "bg-red-600",
    "bg-yellow-600",
    "bg-indigo-600",
    "bg-pink-600",
    "bg-teal-600",
  ]
  const messages = [
    "You can do this ❤️",
    "Stay strong!",
    "Praying for Chloe",
    "May God heal your precious baby girl. Stay strong little one.",
    "Sending love and prayers",
    "God bless you and your family",
    "Wishing Chloe a speedy recovery",
    "Stay positive!",
    "You're in our thoughts",
    "Hang in there!",
    "Jesus is real, please pray for your baby in Jesus name and she will be healed.",
  ]

  const donors = []
  let namedDonorIndex = 1

  for (let i = 0; i < 120; i++) {
    const isAnonymous = Math.random() > 0.6
    const name = isAnonymous ? "Anonymous" : names[Math.floor(Math.random() * names.length)]
    const amount = Number.parseFloat((Math.random() * 100 + 3).toFixed(2))
    const daysAgo = Math.floor(Math.random() * 50) + 32
    const hasMessage = Math.random() > 0.9

    let badge = null
    if (i === 0) badge = "Top donation"
    else if (i === 1) badge = "First donation"

    donors.push({
      name,
      amount,
      daysAgo,
      badge,
      message: hasMessage ? messages[Math.floor(Math.random() * messages.length)] : null,
      isAnonymous,
      // Use pravatar for named donors, null for anonymous
      avatarUrl: isAnonymous ? null : `https://i.pravatar.cc/150?img=${namedDonorIndex++ % 70}`,
      initials: isAnonymous
        ? ""
        : name
            .split(" ")
            .map((n) => n[0])
            .join(""),
      color: colors[Math.floor(Math.random() * colors.length)],
    })
  }

  return donors.sort((a, b) => a.daysAgo - b.daysAgo)
}

export default function DonationPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [showFullStory, setShowFullStory] = useState(false)
  const [coverFees, setCoverFees] = useState(false)
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [visibleDonations, setVisibleDonations] = useState(10)
  const [showNotification, setShowNotification] = useState(false)
  const [currentNotification, setCurrentNotification] = useState(0)
  const [loadingMore, setLoadingMore] = useState(false)

  const [allDonors] = useState(generateDonors())

  const presetAmounts = [20, 50, 100]
  const raised = 3775
  const goal = 10420
  const donorCount = 192
  const progressPercentage = (raised / goal) * 100

  const languages = ["Arabic", "English", "French", "Spanish", "Chinese"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotification((prev) => (prev + 1) % allDonors.length)
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 5000)
    }, 10000)

    return () => clearInterval(interval)
  }, [allDonors.length])

  const handleShowMore = () => {
    setLoadingMore(true)
    setTimeout(() => {
      setVisibleDonations((prev) => {
        const next = prev + 10
        if (next >= allDonors.length) {
          return 10
        }
        return next
      })
      setLoadingMore(false)
    }, 1000)
  }

  const handleOtherClick = () => {
    setSelectedAmount(null)
  }

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount("")
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa] pb-20 md:pb-0">
      {/* Sticky Header - appears on scroll */}
      <div className="hidden lg:block sticky top-0 bg-white shadow-soft z-30">
        <div className="max-w-[1300px] mx-auto px-6 py-4 flex items-center justify-between">
          <h2 className="text-paypal-heading-4 font-paypal-regular text-[rgb(0,20,53)]">
            Support Chloe's fight aganist Leukemia
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-36 bg-[#e5e7eb] rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#1f8505] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-paypal-body-secondary text-[rgb(0,20,53)] font-paypal-regular whitespace-nowrap">
              <span className="font-paypal-semibold">{raised.toLocaleString()} $</span> raised of{" "}
              {goal.toLocaleString()} $
            </span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full h-64 md:h-80 lg:h-[400px] relative overflow-hidden bg-white">
        <img
          src="https://pics.paypal.com/00/s/ODMzZjc4Y2EtZjY2ZS00MDhmLWIyNDctYjg5NzdlMmQzMGU1/file.PNG"
          alt="Campaign hero"
          className="w-full h-full object-cover"
          crossOrigin="anonymous"
        />
      </div>

      <div className="max-w-[1300px] mx-auto px-6 py-8 lg:flex lg:gap-10 lg:items-start">
        {/* Main Content */}
        <div className="lg:flex-1 lg:max-w-[680px]">
          <h1 className="text-paypal-heading-1 font-paypal-light text-[rgb(0,20,53)] mb-5 tracking-[-0.02em] leading-tight">
            Support Chloe's fight aganist Leukemia
          </h1>

          <div className="flex items-center gap-2.5 mb-4">
            <div className="flex -space-x-1">
              <div className="w-6 h-6 rounded-full bg-[#1f8505] border-2 border-white flex items-center justify-center shadow-sm">
                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#1f8505] border-2 border-white flex items-center justify-center shadow-sm">
                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <span className="text-paypal-body-secondary text-[rgb(0,20,53)] font-paypal-regular">
              {donorCount} people have donated
            </span>
          </div>

          <div className="mb-3">
            <div className="w-full bg-[#e5e7eb] rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#1f8505] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <p className="text-paypal-body text-[rgb(0,20,53)] mb-10 font-paypal-regular">
            <span className="font-paypal-bold text-[rgb(0,20,53)]">{raised.toLocaleString()} $</span> raised of{" "}
            {goal.toLocaleString()} $
          </p>

          {/* Campaign Story */}
          <div className="prose max-w-none">
            <p className="text-[rgb(0,20,53)] leading-[1.6] mb-5 text-paypal-body font-paypal-regular">
              <span className="font-paypal-bold">My daughter Chloe suddenly collapsed</span> and was rushed to the
              emergency room. After extensive blood tests, we received the{" "}
              <span className="font-paypal-bold">devastating news that she has leukemia.</span>
            </p>

            {showFullStory && (
              <>
                <p className="text-[rgb(0,20,53)] leading-[1.6] mb-5 text-paypal-body font-paypal-regular">
                  Chloe was immediately transferred by a critical care team to the{" "}
                  <span className="font-paypal-bold">Children's Hospital</span>, where she has already undergone both
                  blood and plasma transfusions. In the coming days, she will have a{" "}
                  <span className="font-paypal-bold">bone marrow biopsy and lumbar puncture</span> to determine the
                  specific type of leukemia. Chloe will be facing
                  <span className="font-paypal-bold"> chemotherapy</span>, along with numerous other tests and
                  treatments, for an uncertain period of time.
                </p>

                <p className="text-[rgb(0,20,53)] leading-[1.6] mb-5 text-paypal-body font-paypal-regular">
                  Chloe also has a <span className="font-paypal-bold">younger brother who is autistic</span>, and he is
                  struggling with the situation at the hospital. Unfortunately, we are{" "}
                  <span className="font-paypal-bold">unable to afford childcare</span> for him, making it even more
                  difficult to be with Chloe full-time during this critical period. We are asking for{" "}
                  <span className="font-paypal-bold">
                    donations to help cover childcare costs and the mounting medical expenses.
                  </span>{" "}
                  Any amount you can give will make a difference.
                </p>

                <p className="text-[rgb(0,20,53)] leading-[1.6] mb-5 text-paypal-body font-paypal-regular">
                  We also ask for your <span className="font-paypal-bold">prayers and well wishes</span> for Chloe. She
                  needs all the strength and support we can offer during this challenging time. I had some problems with
                  the last page. Please click on the 'Donate' button to make a donation.
                </p>

                <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden mb-5 shadow-soft">
                  <img
                    src="https://pics.paypal.com/00/s/MDk0OWM0ODEtMDY5ZS00Y2YyLTlmYzUtZDE3MDIzMGI2NGRi/file.JPG"
                    alt="Chloe in hospital"
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
              </>
            )}

            <button
              onClick={() => setShowFullStory(!showFullStory)}
              className="text-[#0070ba] hover:underline font-paypal-medium text-paypal-body cursor-pointer transition-colors"
            >
              {showFullStory ? "Read less" : "Read more"}
            </button>
          </div>

          <div className="mt-14">
            <h2 className="text-paypal-heading-2 font-paypal-light text-[rgb(0,20,53)] mb-7">
              Donations ({donorCount})
            </h2>

            <div className="space-y-6">
              {allDonors.slice(0, visibleDonations).map((donation, index) => (
                <div key={index} className="flex items-start gap-3.5">
                  <Avatar className="w-11 h-11 shrink-0 shadow-soft">
                    {donation.isAnonymous ? (
                      <AvatarFallback className="bg-green-600 text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </AvatarFallback>
                    ) : (
                      <>
                        <AvatarImage src={donation.avatarUrl || "/placeholder.svg"} alt={donation.name} />
                        <AvatarFallback className={`${donation.color} text-white font-paypal-semibold text-sm`}>
                          {donation.initials}
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-paypal-bold text-[rgb(0,20,53)] text-paypal-body">{donation.name}</h3>
                      <span className="font-paypal-bold text-[rgb(0,20,53)] whitespace-nowrap text-paypal-body">
                        {donation.amount.toFixed(2)} $
                      </span>
                    </div>

                    <p className="text-paypal-body-secondary text-[#6c7378] mb-2.5 font-paypal-regular">
                      {donation.daysAgo === 0 ? "Today" : `${donation.daysAgo} Days Ago`}
                    </p>

                    {donation.badge && (
                      <div className="inline-flex items-center gap-1.5 bg-[#6f41d8] text-white text-paypal-body-secondary font-paypal-semibold px-3 py-1.5 rounded-full mb-2.5 shadow-soft">
                        <Star className="w-3 h-3 fill-white" />
                        {donation.badge}
                      </div>
                    )}

                    {donation.message && (
                      <p className="text-paypal-body text-[rgb(0,20,53)] bg-white rounded-lg px-4 py-3 mt-2.5 leading-[1.6] font-paypal-regular shadow-soft border border-[#e5e7eb]">
                        {donation.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              {loadingMore ? (
                <div className="flex items-center justify-center gap-2.5">
                  <div className="w-5 h-5 border-2 border-[#0070ba] border-t-transparent rounded-full animate-spin" />
                  <span className="text-[#6c7378] text-paypal-body font-paypal-regular">Loading...</span>
                </div>
              ) : (
                <button
                  onClick={handleShowMore}
                  className="text-[#0070ba] hover:underline font-paypal-medium text-paypal-body cursor-pointer transition-colors"
                >
                  Show more
                </button>
              )}
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-[#e5e7eb]">
            <h2 className="text-paypal-heading-2 font-paypal-light text-[rgb(0,20,53)] mb-3">
              Share and inspire others to give
            </h2>
            <p className="text-[#6c7378] text-paypal-body mb-6 font-paypal-regular leading-[1.6]">
              Invite your friends, family, and community to donate to this campaign.
            </p>

            <div className="flex gap-3 flex-wrap">
              {/* Email */}
              <a
                href="#"
                className="w-11 h-11 rounded-full bg-[#003087] hover:bg-[#002a6f] flex items-center justify-center text-white transition-all duration-200 cursor-pointer shadow-soft hover:shadow-soft-md"
                aria-label="Share via email"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="w-11 h-11 rounded-full bg-[#003087] hover:bg-[#002a6f] flex items-center justify-center text-white transition-all duration-200 cursor-pointer shadow-soft hover:shadow-soft-md"
                aria-label="Share on LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                className="w-11 h-11 rounded-full bg-[#003087] hover:bg-[#002a6f] flex items-center justify-center text-white transition-all duration-200 cursor-pointer shadow-soft hover:shadow-soft-md"
                aria-label="Share on Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Messenger */}
              <a
                href="#"
                className="w-11 h-11 rounded-full bg-[#003087] hover:bg-[#002a6f] flex items-center justify-center text-white transition-all duration-200 cursor-pointer shadow-soft hover:shadow-soft-md"
                aria-label="Share on Messenger"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.248-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.4004 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="#"
                className="w-11 h-11 rounded-full bg-[#003087] hover:bg-[#002a6f] flex items-center justify-center text-white transition-all duration-200 cursor-pointer shadow-soft hover:shadow-soft-md"
                aria-label="Share on WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.248-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href="#"
                className="w-11 h-11 rounded-full bg-[#003087] hover:bg-[#002a6f] flex items-center justify-center text-white transition-all duration-200 cursor-pointer shadow-soft hover:shadow-soft-md"
                aria-label="Share on X"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003 6.003 0 0 0-1.905 1.242 1 1 0 1 0 1.41 1.418l1.709-1.699a3.985 3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005 3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201 13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995 2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0 0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836 19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997 0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632 1.563 1 1 0 0 0 1.602-1.198z" />
                </svg>
              </a>

              {/* Copy Link */}
              <a
                href="#"
                className="w-11 h-11 rounded-full bg-[#003087] hover:bg-[#002a6f] flex items-center justify-center text-white transition-all duration-200 cursor-pointer shadow-soft hover:shadow-soft-md"
                aria-label="Copy link"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.248-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="hidden lg:block lg:w-[360px] lg:shrink-0">
          <div className="sticky top-24">
            <Card className="p-7 shadow-soft-lg border-0 rounded-xl bg-white">
              <h3 className="font-paypal-semibold text-[rgb(0,20,53)] mb-7 text-paypal-heading-4">Kayla Willams</h3>

              <div className="grid grid-cols-3 gap-2.5 mb-4">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handlePresetClick(amount)}
                    className={`py-3.5 px-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                      selectedAmount === amount
                        ? "border-[#0070ba] bg-[#0070ba] text-white shadow-soft"
                        : "border-[#e5e7eb] hover:border-[#cbd2d6] bg-white"
                    }`}
                  >
                    <div
                      className={`font-paypal-bold text-paypal-heading-4 ${selectedAmount === amount ? "text-white" : "text-[rgb(0,20,53)]"}`}
                    >
                      {amount} $
                    </div>
                    <div
                      className={`text-paypal-body-secondary ${selectedAmount === amount ? "text-white/90" : "text-[#6c7378]"}`}
                    >
                      USD
                    </div>
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <button
                  onClick={handleOtherClick}
                  className={`w-full py-3.5 px-4 rounded-lg transition-all duration-200 font-paypal-bold text-paypal-body cursor-pointer ${
                    selectedAmount === null && customAmount
                      ? "bg-[#003087] text-white hover:bg-[#002a6f] shadow-soft"
                      : "border-2 border-[#e5e7eb] hover:border-[#cbd2d6] bg-white text-[rgb(0,20,53)]"
                  }`}
                >
                  Other
                </button>

                {selectedAmount === null && (
                  <input
                    type="text"
                    placeholder="Enter an amount"
                    value={customAmount}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9.]/g, "")
                      setCustomAmount(value)
                    }}
                    className="w-full mt-3 px-4 py-3.5 border-2 border-[#e5e7eb] rounded-lg text-paypal-body text-[rgb(0,20,53)] placeholder:text-[#9da3a6] focus:outline-none focus:border-[#0070ba] focus:ring-0"
                  />
                )}
              </div>

              <div className="flex items-start gap-2.5 mb-6">
                <Checkbox
                  id="cover-fees"
                  checked={coverFees}
                  onCheckedChange={(checked) => setCoverFees(checked as boolean)}
                  className="mt-0.5"
                />
                <label
                  htmlFor="cover-fees"
                  className="text-paypal-body-secondary text-[rgb(0,20,53)] cursor-pointer leading-[1.6] font-paypal-regular"
                >
                  Add <span className="font-paypal-bold">0,91 USD</span> to help cover the fees.
                </label>
              </div>

              <div className="space-y-3">
                <a
                  href="#"
                  className="w-full bg-[#ffc439] hover:bg-[#eab73f] text-[#003087] font-paypal-semibold py-3.5 rounded-full text-paypal-body h-auto shadow-soft hover:shadow-soft-md border-0 transition-all duration-200 flex items-center justify-center"
                >
                  Donate with PayPal
                </a>

                <a
                  href="#"
                  className="w-full border-2 border-[#000000] text-[#000000] hover:bg-[#1a1a1a] hover:text-white hover:border-[#000000] font-paypal-semibold py-3.5 rounded-full text-paypal-body h-auto bg-white shadow-soft hover:shadow-soft-md transition-all duration-200 flex items-center justify-center"
                >
                  Donate with Debit or Credit Card
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white p-4 z-40 shadow-soft-xl">
        <a
          href="#"
          className="w-full bg-[#0070ba] hover:bg-[#005ea6] text-white font-paypal-semibold py-3.5 rounded-full text-paypal-body h-auto shadow-soft transition-all duration-200 flex items-center justify-center"
        >
          Donate
        </a>
      </div>

      <footer className="w-full border-t border-[#e5e7eb] mt-20 bg-white">
        <div className="px-6 py-8">
          <div className="flex flex-wrap gap-x-5 gap-y-2.5 text-paypal-body-secondary text-[rgb(0,20,53)] mb-4">
            <a href="#" className="hover:underline font-paypal-regular cursor-pointer transition-colors">
              Help & Contact
            </a>
            <a href="#" className="hover:underline font-paypal-regular cursor-pointer transition-colors">
              Security
            </a>
            <a href="#" className="hover:underline font-paypal-regular cursor-pointer transition-colors">
              Report Inappropriate Content
            </a>
            <a href="#" className="hover:underline font-paypal-regular cursor-pointer transition-colors">
              Feedback
            </a>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2.5 text-paypal-legal">
            <span className="font-paypal-regular">©1999-2025 PayPal, Inc. All rights reserved.</span>
            <a href="#" className="hover:underline font-paypal-regular cursor-pointer transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:underline font-paypal-regular cursor-pointer transition-colors">
              Legal
            </a>
            <a href="#" className="hover:underline font-paypal-regular cursor-pointer transition-colors">
              Policy updates
            </a>
          </div>
        </div>
      </footer>

      {showNotification && (
        <div className="fixed bottom-6 right-6 bg-white rounded-xl shadow-soft-xl p-5 flex items-center gap-4 max-w-xs animate-in slide-in-from-bottom-5 z-50 border border-[#e5e7eb]">
          <Avatar className="w-11 h-11 shrink-0 shadow-soft">
            {allDonors[currentNotification].isAnonymous ? (
              <AvatarFallback className="bg-green-600 text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </AvatarFallback>
            ) : (
              <>
                <AvatarImage
                  src={allDonors[currentNotification].avatarUrl || "/placeholder.svg"}
                  alt={allDonors[currentNotification].name}
                />
                <AvatarFallback
                  className={`${allDonors[currentNotification].color} text-white font-paypal-semibold text-xs`}
                >
                  {allDonors[currentNotification].initials}
                </AvatarFallback>
              </>
            )}
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-paypal-body-secondary font-paypal-medium text-[rgb(0,20,53)] truncate">
              {allDonors[currentNotification].name} donated
            </p>
            <p className="text-paypal-body-secondary text-[rgb(0,20,53)] font-paypal-regular">
              {allDonors[currentNotification].amount.toFixed(2)} $
            </p>
          </div>
          <button
            onClick={() => setShowNotification(false)}
            className="text-[#6c7378] hover:text-[rgb(0,20,53)] shrink-0 cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}

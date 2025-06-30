import type { Language } from "@/types"

export interface Translations {
  nav: {
    about: string
    why: string
    pray: string
    community: string
    support: string
  }
  sections: {
    about: {
      title: string
      subtitle: string
      description: string
      cta: string
    }
    why: {
      title: string
      subtitle: string
      description: string
      cta: string
    }
    play: {
      title: string
      subtitle: string
      mysteryTitles: string[]
      modal: {
        significance: string
        reflection: string
        choosePerspectives: string
        perspectives: string
        speed: string
      }
      cta: string
    }
    community: {
      title: string
      subtitle: string
      description: string
      cta: string
    }
    support: {
      title: string
      subtitle: string
      description: string
      cta: string
    }
  }
  audio: {
    play: string
    pause: string
    rewind: string
    fastForward: string
    loading: string
    error: string
  }
  common: {
    close: string
    loading: string
    error: string
    retry: string
    getStarted: string
    next: string
    previous: string
  }
  footer: {
    copyright: string
    poweredBy: string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      about: "About",
      why: "Why",
      pray: "Pray",
      community: "Community",
      support: "Support",
    },
    sections: {
      about: {
        title: "About the Rosary",
        subtitle: "Discover the beauty and power of this ancient prayer",
        description:
          "The Rosary is a form of prayer used especially in the Catholic Church named for the string of knots or beads used to count the component prayers. The prayers consist of repeated sequences of the Lord's Prayer followed by ten prayings of the Hail Mary and a single praying of 'Glory Be to the Father'; each of these sequences is known as a decade.",
        cta: "Learn More",
      },
      why: {
        title: "Why Pray the Rosary?",
        subtitle: "Experience peace, reflection, and spiritual growth",
        description:
          "The Rosary offers a path to deeper prayer and meditation. Through the repetition of familiar prayers and contemplation of the mysteries, we enter into the life of Christ and Mary, finding peace and spiritual nourishment.",
        cta: "Pray",
      },
      play: {
        title: "The Rosary Mysteries",
        subtitle: "Choose a set of mysteries to begin your prayer journey",
        mysteryTitles: ["Joyful", "Luminous", "Sorrowful", "Glorious"],
        modal: {
          significance: "Significance:",
          reflection: "Reflection:",
          choosePerspectives: "Choose Perspectives:",
          perspectives: "Perspectives",
          speed: "Speed:",
        },
        cta: "Community",
      },
      community: {
        title: "Join Our Community",
        subtitle: "Connect with fellow believers around the world",
        description:
          "Share your prayer intentions, join group rosaries, and find support in our global community of faith.",
        cta: "Get Involved!",
      },
      support: {
        title: "Support & Help",
        subtitle: "Get help with using the app or learn more about the Rosary",
        description: "Find answers to common questions, learn about Rosary traditions, or contact our support team.",
        cta: "Have an awesome idea or feedback? Drop us an email at",
      },
    },
    audio: {
      play: "Play",
      pause: "Pause",
      rewind: "Rewind 10 seconds",
      fastForward: "Fast forward 10 seconds",
      loading: "Loading audio...",
      error: "Error loading audio",
    },
    common: {
      close: "Close",
      loading: "Loading...",
      error: "An error occurred",
      retry: "Retry",
      getStarted: "Get Started",
      next: "Next",
      previous: "Previous",
    },
    footer: {
      copyright: "All rights reserved.",
      poweredBy: "Powered by",
    },
  },
  vi: {
    nav: {
      about: "Giới thiệu",
      why: "Tại sao",
      pray: "Cầu nguyện",
      community: "Cộng đồng",
      support: "Hỗ trợ",
    },
    sections: {
      about: {
        title: "Về Kinh Mân Côi",
        subtitle: "Khám phá vẻ đẹp và sức mạnh của lời cầu nguyện cổ xưa này",
        description:
          "Kinh Mân Côi là một hình thức cầu nguyện được sử dụng đặc biệt trong Giáo hội Công giáo, được đặt tên theo chuỗi hạt hoặc nút thắt được sử dụng để đếm các lời cầu nguyện thành phần.",
        cta: "Tìm hiểu thêm",
      },
      why: {
        title: "Tại sao cầu nguyện Kinh Mân Côi?",
        subtitle: "Trải nghiệm sự bình an, suy tư và phát triển tâm linh",
        description: "Kinh Mân Côi mang đến con đường đến với lời cầu nguyện và thiền định sâu sắc hơn.",
        cta: "Cầu nguyện",
      },
      play: {
        title: "Các Mầu Nhiệm Kinh Mân Côi",
        subtitle: "Chọn một bộ mầu nhiệm để bắt đầu hành trình cầu nguyện của bạn",
        mysteryTitles: ["Vui", "Sáng", "Thương", "Mừng"],
        modal: {
          significance: "Ý nghĩa:",
          reflection: "Suy niệm:",
          choosePerspectives: "Chọn Góc nhìn:",
          perspectives: "Góc nhìn",
          speed: "Tốc độ:",
        },
        cta: "Cộng đồng",
      },
      community: {
        title: "Tham gia Cộng đồng",
        subtitle: "Kết nối với những tín hữu khác trên khắp thế giới",
        description:
          "Chia sẻ ý hướng cầu nguyện, tham gia các nhóm cầu Mân Côi và tìm thấy sự hỗ trợ trong cộng đồng đức tin toàn cầu của chúng ta.",
        cta: "Tham gia!",
      },
      support: {
        title: "Hỗ trợ & Trợ giúp",
        subtitle: "Nhận trợ giúp sử dụng ứng dụng hoặc tìm hiểu thêm về Kinh Mân Côi",
        description:
          "Tìm câu trả lời cho các câu hỏi thường gặp, tìm hiểu về truyền thống Kinh Mân Côi hoặc liên hệ với đội ngũ hỗ trợ của chúng tôi.",
        cta: "Có ý tưởng tuyệt vời hoặc phản hồi? Gửi email cho chúng tôi tại",
      },
    },
    audio: {
      play: "Phát",
      pause: "Tạm dừng",
      rewind: "Tua lại 10 giây",
      fastForward: "Tua nhanh 10 giây",
      loading: "Đang tải âm thanh...",
      error: "Lỗi tải âm thanh",
    },
    common: {
      close: "Đóng",
      loading: "Đang tải...",
      error: "Đã xảy ra lỗi",
      retry: "Thử lại",
      getStarted: "Bắt đầu",
      next: "Tiếp theo",
      previous: "Trước",
    },
    footer: {
      copyright: "Tất cả quyền được bảo lưu.",
      poweredBy: "Được hỗ trợ bởi",
    },
  },
}

export type TranslationKey = keyof typeof translations.en

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
      cta: string
    }
    why: {
      title: string
      cards: {
        card1: {
          short: string
          full: string
        }
        card2: {
          short: string
          full: string
        }
        card3: {
          short: string
          full: string
        }
      }
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
      comingSoon: string
      sections: {
        community: {
          title: string
          description: string
        }
        connections: {
          title: string
          description: string
        }
        interactive: {
          title: string
          description: string
        }
        building: {
          title: string
          description: string
          features: string[]
        }
      }
      cta: string
    }
    support: {
      title: string
      subtitle: string
      cards: {
        monthly: {
          title: string
          description: string
          cta: string
        }
        oneTime: {
          title: string
          description: string
          cta: string
        }
        volunteer: {
          title: string
          description: string
          cta: string
        }
      }
      contact: string
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
  }
  footer: {
    copyright: string
    poweredBy: string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      about: "ABOUT",
      why: "WHY",
      pray: "PRAY",
      community: "COMMUNITY",
      support: "SUPPORT",
    },
    sections: {
      about: {
        title: "Welcome to Rosary Narrated",
        subtitle:
          "Ready to experience the Rosary in a whole new way? We're building a community around guided reflections rooted in theological insights for each decade. No matter where you're starting from, there's something here for you.",
        cta: "Why",
      },
      why: {
        title: "Why Pray the Rosary?",
        cards: {
          card1: {
            short: "Fix your eyes on Jesus, the author and finisher of our faith.",
            full: "The Rosary is not a mindless incantation. It is a sacred meditation—a spiritual photo album that walks us through the life, love, and sacrifice of Jesus Christ. Each decade reveals a vivid mystery: His joy, His suffering, His glory. By praying the Rosary, we don't lose ourselves in words—we find His face in each mystery. Fix your eyes on Jesus, the author and finisher of our faith.",
          },
          card2: {
            short: "Where two or three are gathered in my name, I am there among them (Matthew 18:20)",
            full: 'Jesus said "Where two or three are gathered in my name, I am there among them" (Matthew 18:20). He longs for us to pray together, for one another. Who better to pray with us than the one who walked every step of His earthly life beside Him—His own mother? Mary isn\'t distant. She is the Queen Mother of Heaven, always interceding for us with tender love. "Pray for one another, that you may be healed". "The prayer of a righteous person has great power" (James 5:16). "All these with one accord were devoting themselves to prayer, together with... Mary the mother of Jesus" (Acts 1:14).',
          },
          card3: {
            short: "Mary continues to intercede for us—because she loves as only a mother can.",
            full: 'On the Cross, Jesus gave us everything: His body, His blood, His heart—and His mother. "Woman, behold your son... Son, behold your mother" (John 19:26–27). Mary stood at the foot of the Cross, silent in sorrow, enduring the pain of watching her Son—God Himself—scourged, mocked, and crucified. And yet, she didn\'t turn away. "Her soul pierced by sorrow" (Luke 2:35), she became our mother too. "His face was like the sun shining in full strength" (Revelation 1:16). "God did not spare His own Son, but gave Him up for us all" (Romans 8:32). Mary continues to intercede for us—because she loves as only a mother can.',
          },
        },
        cta: "Pray",
      },
      play: {
        title: "The Mysteries of the Rosary",
        subtitle:
          "Each Mystery tells a story. Experience them through audio and visuals designed to help you connect. Choose a set to get started.",
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
        title: "Coming Soon",
        comingSoon: "Coming Soon",
        sections: {
          community: {
            title: "Community",
            description:
              "Finding your place in faith can be complicated. We get it. We've been through it. Here, we're building something different.",
          },
          connections: {
            title: "Regular Connections",
            description:
              "Virtual meetups where you can show up where you are spiritually. Discuss scriptural perspectives. Discuss hard stuff. Talk through life stuff. Find people who also get it, or not. Pray together.",
          },
          interactive: {
            title: "Interactive Faith",
            description:
              "Making scripture study feels less intimidating and more like bite size soul foods that integrates into your daily world.",
          },
          building: {
            title: "What We're Building",
            description: "Some exciting stuff in the works:",
            features: [
              "Live and virtual spaces for prayer and real talk",
              "Scripture reflections that wake you up so hard that you cancel your Starbucks membership card",
              "Growth challenges that feel doable",
              "Peer-support that's helpful",
            ],
          },
        },
        cta: "Get Involved!",
      },
      support: {
        title: "Keep This Going",
        subtitle:
          "We're building something meaningful here – bridging theological insights and accessibility for global audiences. Your support helps us keep the lights on and reach more people who need this.",
        cards: {
          monthly: {
            title: "Monthly Support",
            description:
              "Become a monthly supporter and help us develop and maintain this program for the global community.",
            cta: "SUPPORT MONTHLY",
          },
          oneTime: {
            title: "One-Time Donation",
            description:
              "Make a one-time contribution to support the development and hosting of these audiovisual experiences.",
            cta: "DONATE ONCE",
          },
          volunteer: {
            title: "Volunteering",
            description: "Want to join us in building something bigger with your skills and time? Get Involved!",
            cta: "VOLUNTEER",
          },
        },
        contact: "Have an awesome idea or feedback? Drop us an email at",
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
    },
    footer: {
      copyright: "All rights reserved.",
      poweredBy: "Powered by",
    },
  },
  vi: {
    nav: {
      about: "GIỚI THIỆU",
      why: "TẠI SAO",
      pray: "CẦU NGUYỆN",
      community: "CỘNG ĐỒNG",
      support: "HỖ TRỢ",
    },
    sections: {
      about: {
        title: "Chào mừng đến với Rosary Narrated",
        subtitle:
          "Sẵn sàng trải nghiệm Kinh Mân Côi theo một cách hoàn toàn mới? Chúng tôi đang xây dựng một cộng đồng xung quanh những suy niệm có hướng dẫn dựa trên những hiểu biết thần học cho mỗi thập. Dù bạn bắt đầu từ đâu, ở đây đều có điều gì đó dành cho bạn.",
        cta: "Tại sao",
      },
      why: {
        title: "Tại sao cầu nguyện Kinh Mân Côi?",
        cards: {
          card1: {
            short: "Hãy hướng mắt về Chúa Giêsu, Đấng khởi đầu và hoàn thành đức tin của chúng ta.",
            full: "Kinh Mân Côi không phải là một bài tụng vô nghĩa. Đó là một thiền định thiêng liêng—một album ảnh tâm linh dẫn chúng ta qua cuộc đời, tình yêu và sự hy sinh của Chúa Giêsu Kitô. Mỗi thập tiết lộ một mầu nhiệm sống động: Niềm vui, Đau khổ, Vinh quang của Ngài. Bằng cách cầu nguyện Kinh Mân Côi, chúng ta không lạc lối trong lời nói—chúng ta tìm thấy gương mặt Ngài trong mỗi mầu nhiệm. Hãy hướng mắt về Chúa Giêsu, Đấng khởi đầu và hoàn thành đức tin của chúng ta.",
          },
          card2: {
            short: "Nơi nào có hai hoặc ba người tụ họp nhân danh Ta, thì Ta ở giữa họ (Mt 18:20)",
            full: 'Chúa Giêsu đã nói "Nơi nào có hai hoặc ba người tụ họp nhân danh Ta, thì Ta ở giữa họ" (Mt 18:20). Ngài khao khát chúng ta cầu nguyện cùng nhau, cho nhau. Ai tốt hơn để cầu nguyện với chúng ta hơn người đã đi từng bước trong cuộc đời trần thế bên cạnh Ngài—chính Mẹ của Ngài? Mẹ Maria không xa cách. Mẹ là Nữ Hoàng Mẹ của Thiên đàng, luôn cầu bầu cho chúng ta với tình yêu dịu dàng.',
          },
          card3: {
            short: "Mẹ Maria tiếp tục cầu bầu cho chúng ta—vì Mẹ yêu thương như chỉ có một người mẹ mới có thể.",
            full: 'Trên Thánh Giá, Chúa Giêsu đã ban cho chúng ta tất cả: Mình, Máu, Trái Tim—và Mẹ của Ngài. "Hỡi Bà, đây là con trai Bà... Này con, đây là Mẹ con" (Ga 19:26–27). Mẹ Maria đã đứng dưới chân Thánh Giá, im lặng trong đau buồn, chịu đựng nỗi đau khi chứng kiến Con mình—chính Thiên Chúa—bị đánh đòn, chế nhạo và đóng đinh. Và Mẹ không quay mặt đi. Mẹ đã trở thành mẹ của chúng ta. Mẹ Maria tiếp tục cầu bầu cho chúng ta—vì Mẹ yêu thương như chỉ có một người mẹ mới có thể.',
          },
        },
        cta: "Cầu nguyện",
      },
      play: {
        title: "Các Mầu Nhiệm của Kinh Mân Côi",
        subtitle:
          "Mỗi Mầu Nhiệm kể một câu chuyện. Trải nghiệm chúng qua âm thanh và hình ảnh được thiết kế để giúp bạn kết nối. Chọn một bộ để bắt đầu.",
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
        title: "Sắp ra mắt",
        comingSoon: "Sắp ra mắt",
        sections: {
          community: {
            title: "Cộng đồng",
            description:
              "Tìm vị trí của bạn trong đức tin có thể phức tạp. Chúng tôi hiểu điều đó. Chúng tôi đã trải qua. Ở đây, chúng tôi đang xây dựng điều gì đó khác biệt.",
          },
          connections: {
            title: "Kết nối Thường xuyên",
            description:
              "Các cuộc gặp gỡ ảo nơi bạn có thể xuất hiện ở bất cứ đâu về mặt tâm linh. Thảo luận về quan điểm Kinh thánh. Thảo luận về những điều khó khăn. Nói về những chuyện đời. Tìm những người cũng hiểu, hoặc không. Cầu nguyện cùng nhau.",
          },
          interactive: {
            title: "Đức tin Tương tác",
            description:
              "Làm cho việc nghiên cứu Kinh thánh trở nên ít đáng sợ hơn và giống như những món ăn tâm hồn nhỏ gọn hòa nhập vào thế giới hàng ngày của bạn.",
          },
          building: {
            title: "Những gì chúng tôi đang xây dựng",
            description: "Một số điều thú vị đang được thực hiện:",
            features: [
              "Không gian trực tiếp và ảo cho cầu nguyện và trò chuyện thật",
              "Suy niệm Kinh thánh đánh thức bạn mạnh mẽ đến mức bạn hủy thẻ thành viên Starbucks",
              "Thử thách phát triển có thể thực hiện được",
              "Hỗ trợ đồng đẳng hữu ích",
            ],
          },
        },
        cta: "Tham gia!",
      },
      support: {
        title: "Duy trì điều này",
        subtitle:
          "Chúng tôi đang xây dựng điều gì đó có ý nghĩa ở đây – kết nối những hiểu biết thần học và khả năng tiếp cận cho khán giả toàn cầu. Sự hỗ trợ của bạn giúp chúng tôi duy trì hoạt động và tiếp cận nhiều người cần điều này hơn.",
        cards: {
          monthly: {
            title: "Hỗ trợ Hàng tháng",
            description:
              "Trở thành người hỗ trợ hàng tháng và giúp chúng tôi phát triển và duy trì chương trình này cho cộng đồng toàn cầu.",
            cta: "HỖ TRỢ HÀNG THÁNG",
          },
          oneTime: {
            title: "Quyên góp Một lần",
            description: "Đóng góp một lần để hỗ trợ việc phát triển và lưu trữ những trải nghiệm nghe nhìn này.",
            cta: "QUYÊN GÓP MỘT LẦN",
          },
          volunteer: {
            title: "Tình nguyện",
            description:
              "Muốn tham gia với chúng tôi để xây dựng điều gì đó lớn hơn với kỹ năng và thời gian của bạn? Tham gia!",
            cta: "TÌNH NGUYỆN",
          },
        },
        contact: "Có ý tưởng tuyệt vời hoặc phản hồi? Gửi email cho chúng tôi tại",
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
    },
    footer: {
      copyright: "Tất cả quyền được bảo lưu.",
      poweredBy: "Được hỗ trợ bởi",
    },
  },
}

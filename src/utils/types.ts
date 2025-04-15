export type Voice = {
  voice_id: string;
  name: string;
  category: string;
  fine_tuning: {
    is_allowed_to_fine_tune: boolean;
    verification_failures: string[];
    verification_attempts_count: number;
    manual_verification_requested: boolean;
    finetuning_state: "not_started" | "in_progress" | "completed" | "failed";
  };
  labels: {
    accent?: string;
    description?: string;
    age?: string;
    gender?: "male" | "female" | "neutral";
    use_case?: string;
  };
  preview_url: string;
  available_for_tiers: string[];
  high_quality_base_model_ids: string[];
  voice_verification: {
    requires_verification: boolean;
    is_verified: boolean;
    verification_failures: string[];
    verification_attempts_count: number;
  };
};
